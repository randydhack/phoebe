import { csrfFetch } from "./csrf";
import { getAllProjectMembersThunk } from "./members";

// Action Type
const GET_USER_PROJECTS = "projects/GET_USER_PROJECTS ";
const CREATE_PROJECT = "projects/CREATE_PROJECT";
const GET_SINGLE_PROJECT = "projects/GET_SINGLE_PROJECT";
const DELETE_PROJECT = "projects/DELETE_PROJECT";
const UPDATE_PROJECT = "projects/UPDATE_PROJECT";
const TRANSFER_OWNER = "projects/TRANSFER_OWNER"

// Action Creators

const getUserProjectsAction = (projects) => ({
  type: GET_USER_PROJECTS,
  payload: projects,
});

const createProjectAction = (project) => ({
  type: CREATE_PROJECT,
  payload: project,
});

const getSingleProjectAction = (project) => ({
  type: GET_SINGLE_PROJECT,
  payload: project,
});

const deleteProjectAction = (id) => ({
  type: DELETE_PROJECT,
  payload: id,
});

const updateProjectAction = (project) => ({
  type: UPDATE_PROJECT,
  payload: project
})

const transferProjectOwnerAction = (project, member) => ({
  type: TRANSFER_OWNER,
  payload: {project, member}
})

// Thunk action creators
export const userProjectsThunk = () => async (dispatch) => {
  const res = await fetch("/api/projects");

  if (res.ok) {
    const data = await res.json();
    await dispatch(getUserProjectsAction(data));
    return data;
  } else {
    return res.error;
  }
};

export const getSingleProjectThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/projects/${id}`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const data = await res.json();
    await dispatch(getSingleProjectAction(data));
    return data;
  }
};

export const deleteProjectThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/projects/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteProjectAction(id));
    return data;
  }
};

export const createProjectThunk =
  (name, description, backgroundColor) => async (dispatch) => {
    const res = await csrfFetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        backgroundColor
      }),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(createProjectAction(data));
      return data;
    }
  };

export const updateProjectThunk = (name, description, id) => async (dispatch) => {
  const res = await csrfFetch(`/api/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, description }),
  });

  if (res.ok) {
    const data = await res.json()
    await dispatch(updateProjectAction(data))
    return data
  } else {
    const error = await res.json()
    return error
  }
};

export const transferProjectOwnerThunk = (id, memberId) => async (dispatch) => {
  const res = await csrfFetch(`/api/members/project/${id}`, {
    method: 'PUT',
    body: JSON.stringify({memberId})
  })

  if (res.ok) {
    const data = await res.json()
    await dispatch(transferProjectOwnerAction(data.project, data.member))
    await dispatch(userProjectsThunk())
    return data.project
  }
}

// Initial state

// Reducer
const projectReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_USER_PROJECTS:
      newState = {};
      action.payload.forEach((project) => (newState[project.id] = project));
      return newState;
    case CREATE_PROJECT:
      return { ...state, [action.payload.id]: action.payload };
    case GET_SINGLE_PROJECT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_PROJECT:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    case UPDATE_PROJECT:
      newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    case TRANSFER_OWNER:
      newState = {...state}
      newState[action.payload.project.id] = action.payload.project
      newState[action.payload.project.id].Owner = action.payload.member.User
      return newState
    default:
      return state;
  }
};

export default projectReducer;

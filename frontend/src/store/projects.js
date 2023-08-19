import { csrfFetch } from './csrf';

// Action Type
const GET_USER_PROJECTS = "projects/GET_USER_PROJECTS ";
const CREATE_PROJECT = "projects/CREATE_PROJECT";

// Action Creators

const getUserProjectsAction = (projects) => ({
    type: GET_USER_PROJECTS,
    payload: projects,
});

const createProjectAction = (project) => ({
  type: CREATE_PROJECT,
  payload: project
})

// Thunk action creators
export const userProjectsThunk = () => async (dispatch) => {
  const res = await fetch("/api/projects");

  if (res.ok) {
    const data = await res.json();
    await dispatch(getUserProjectsAction(data));
    return data;
  }
};

export const getSingleProjectThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/projects/${id}`)

  if (res.ok) {
    const data = await res.json()

    return data
  }
}

export const createProjectThunk = (name, category, description, projectImage) => async (dispatch) => {

  const res = await csrfFetch('/api/projects', {
    method: 'POST',
    body: JSON.stringify({
      name,
      category,
      description,
      projectImage
    }),
  });

  if (res.ok) {
    const data = await res.json()
    await dispatch(createProjectAction(data))
    return data
  }
}

// Initial state

// Reducer
const projectReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_USER_PROJECTS:
      console.log(action.payload)
      newState = {...state};
      action.payload.forEach((project) => (newState[project.id] = project));
      return newState;
    case CREATE_PROJECT:
      newState = { ...state }
      newState[action.payload.id] = action.payload
      return newState
    default:
      return state;
  }
};

export default projectReducer;

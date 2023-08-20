import { csrfFetch } from './csrf';

// Action Type
const GET_USER_PROJECTS = "projects/GET_USER_PROJECTS ";
const CREATE_PROJECT = "projects/CREATE_PROJECT";
const GET_SINGLE_PROJECT = 'projects/GET_SINGLE_PROJECT'

// Action Creators

const getUserProjectsAction = (projects) => ({
    type: GET_USER_PROJECTS,
    payload: projects,
});

const createProjectAction = (project) => ({
  type: CREATE_PROJECT,
  payload: project
})

const getSingleProjectAction = (project) => ({
  type: GET_SINGLE_PROJECT,
  payload: project
})

// Thunk action creators
export const userProjectsThunk = () => async (dispatch) => {
  const res = await fetch("/api/projects");

  if (res.ok) {
    const data = await res.json();
    await dispatch(getUserProjectsAction(data));
    return data;
  } else {
    return res.error
  }
};

export const getSingleProjectThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/projects/${id}`)

  if (res.ok) {
    const data = await res.json()

    await dispatch(getSingleProjectAction(data))
    return data
  } else {
    const error = await res.json()
      return error
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
    dispatch(createProjectAction(data))
    return data
  }
}

// Initial state

// Reducer
const projectReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_USER_PROJECTS:
      newState = {...state};
      action.payload.forEach((project) => (newState[project.id] = project));
      return newState;
    case CREATE_PROJECT:
      return { ...state, [action.payload.id]: action.payload}
    case GET_SINGLE_PROJECT:
      newState = {...state}
      console.log(action.payload.id, 'payload')
      console.log(newState[4])
      return {...state, [action.payload.id]: action.payload}
    default:
      return state;
  }
};

export default projectReducer;

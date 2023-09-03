import { csrfFetch } from './csrf';

// Action Type
const GET_MEMBER_PROJECTS = 'members/GET_MEMBER_PROJECTS'

// Action Creators

const getMemberProjectsAction = (projects) => ({
  type: GET_MEMBER_PROJECTS,
  payload: projects
})

// Thunk action creators

export const getMemberProjectsThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/members/projects`)

  if (res.ok) {
    const data = await res.json()
    await dispatch(getMemberProjectsAction(data))
    return data
  }
}

// Initial state


// Reducer
const memberProjectsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_MEMBER_PROJECTS:
        newState = {...state}
        action.payload.forEach((project) => (newState[project.id] = project));
        return newState
    default:
      return state;
  }
};

export default memberProjectsReducer;

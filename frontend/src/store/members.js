import { csrfFetch } from './csrf';

// Action Type
const GET_PROJECT_MEMBERS = 'members/GET_PROJECT_MEMBERS'
const LEAVE_PROJECT = 'members/LEAVE_PROJECT'
// const GET_MEMBER_PROJECTS = 'members/GET_MEMBER_PROJECTS'
// Action Creators
const getAllProjectMembersAction = (members) => ({
    type: GET_PROJECT_MEMBERS,
    payload: members,
});

const leaveProjectAction = (member) => ({
  type: LEAVE_PROJECT,
  payload: member
})

// const getMemberProjectsAction = (projects) => ({
//   type: GET_MEMBER_PROJECTS,
//   payload: projects
// })

// Thunk action creators
export const getAllProjectMembersThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/projects/${id}/members`);

  if (res.ok) {
    const data = await res.json();
    await dispatch(getAllProjectMembersAction(data));
    return data;
  }
};

export const leaveProjectThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/members/project/${id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const data = await res.json()
    await dispatch(leaveProjectAction(data))
    return data
  }
}

// export const getMemberProjectsThunk = () => async (dispatch) => {
//   const res = await fetch(`/api/members/projects`)

//   if (res.ok) {
//     const data = await res.json()
//     await dispatch(getMemberProjectsAction)
//     return data
//   }
// }

// Initial state



// Reducer
const memberReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_PROJECT_MEMBERS:
      newState = {...state};
      action.payload.forEach((member) => (newState[member.id] = member));
      return newState;
    case LEAVE_PROJECT:
      newState = {...state}
      console.log(newState)
      delete newState[action.payload.id]
      console.log(newState)
      return newState
    default:
      return state;
  }
};

export default memberReducer;

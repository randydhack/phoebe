import { csrfFetch } from './csrf';
import { getSingleProjectThunk } from './projects';

// Action Type
const GET_PROJECT_MEMBERS = 'members/GET_PROJECT_MEMBERS'
const LEAVE_PROJECT = 'members/LEAVE_PROJECT'
const INVITE_MEMBER = 'members/INVITE_MEMBER'
const REMOVE_MEMBER = 'members/REMOVE_MEMBER'
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

const inviteMemberAction = (newMember) => ({
  type: INVITE_MEMBER,
  payload: newMember
})

const removeMemberAction = (member) => ({
  type: REMOVE_MEMBER,
  payload: member
})

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

export const inviteMemberThunk = (id, email) => async (dispatch) => {
  const res = await csrfFetch(`/api/members/project/${id}`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      projectId: id
    })
  })

  if (res.ok) {
    const data = await res.json()
    await dispatch(inviteMemberAction(data))
    await dispatch(getSingleProjectThunk(id))
    return data
  }
}

export const removeMemberThunk = (id, userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/members/remove/project/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({userId})
  })

  if (res.ok) {
    const data = await res.json()
    await dispatch(removeMemberAction(data))
    await dispatch(getAllProjectMembersThunk(id))
    return data
  }
}

// Initial state



// Reducer
const memberReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_PROJECT_MEMBERS:
      newState = {};
      action.payload.forEach((member) => (newState[member.id] = member));
      return newState;
    case LEAVE_PROJECT:
      newState = {...state}
      delete newState[action.payload.id]
      return newState
    case INVITE_MEMBER:
      newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    case REMOVE_MEMBER:
      newState = {...state}
      delete newState[action.payload.id]
      return newState
    default:
      return state;
  }
};

export default memberReducer;

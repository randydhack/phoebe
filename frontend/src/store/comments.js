import { csrfFetch } from "./csrf";

// Action Type
const CREATE_COMMENTS = "comments/CREATE_COMMENTS";
const GET_COMMENTS = "comments/GET_COMMENTS";
const DELETE_COMMENT = 'comments/DELETE_COMMENT'
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'
// Action Creators

export const createCommentAction = (comment) => ({
  type: CREATE_COMMENTS,
  payload: comment,
});

export const getCommentByCardIdAction = (comments) => ({
  type: GET_COMMENTS,
  payload: comments,
});

export const deleteCommentAction = (comment) => ({
  type: DELETE_COMMENT,
  payload: comment
})

export const updateCommentAction = (comment) => ({
  type: UPDATE_COMMENT,
  payload: comment
})
// Thunk action creators

export const getCommentByCardIdThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${id}`);

  if (res.ok) {
    const data = await res.json();
    await dispatch(getCommentByCardIdAction(data))
    return data;
  }
};

export const createCommentThunk = (cardId, comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments`, {
    method: "POST",
    body: JSON.stringify({
      cardId,
      comment,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    await dispatch(createCommentAction(data));
    await dispatch(getCommentByCardIdThunk(data.cardId))
    return data;
  }
};

export const deleteCommentThunk = (id) => async dispatch => {
  const res = await csrfFetch(`/api/comments/${id}`, {
    method: 'DELETE',
  })

  if (res.ok) {
    const data = await res.json()
    await dispatch(deleteCommentAction(data))
    return data
  }
}

export const updateCommentThunk = (id, comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      comment
    })
  })

  if (res.ok) {
    const data = await res.json()
    await dispatch(updateCommentAction(data))
    return data
  }
}

// Initial state

// Reducer
const commentReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_COMMENTS:
      newState = {};
      action.payload.forEach((comment) => (newState[comment.id] = comment));
      return newState;
    case CREATE_COMMENTS:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_COMMENT:
      newState = {...state}
      delete newState[action.payload.id]
      return newState
    case UPDATE_COMMENT:
      newState = {...state}
      console.log(newState, 'NEW STATE')
      console.log(action.payload, 'PAYLOAD')
      newState[action.payload.id] = action.payload
      return newState
    default:
      return state;
  }
};

export default commentReducer;

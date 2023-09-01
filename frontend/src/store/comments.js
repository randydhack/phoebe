import { csrfFetch } from "./csrf";

// Action Type
const CREATE_COMMENTS = "comments/CREATE_COMMENTS";
const GET_COMMENTS = "comments/GET_COMMENTS";

// Action Creators

export const createCommentAction = (comment) => ({
  type: CREATE_COMMENTS,
  payload: comment,
});

export const getCommentByCardIdAction = (comments) => ({
  type: GET_COMMENTS,
  payload: comments,
});

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
    return data;
  }
};

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

    default:
      return state;
  }
};

export default commentReducer;

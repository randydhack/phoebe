import { csrfFetch } from "./csrf";

// Action Type
const CREATE_COMMENTS = "comments/CREATE_COMMENT";

// Action Creators

export const createCommentAction = (comment) => ({
  type: CREATE_COMMENTS,
  payload: comment,
});

// Thunk action creators

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
    case CREATE_COMMENTS:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default commentReducer;

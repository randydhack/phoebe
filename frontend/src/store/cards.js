import { csrfFetch } from "./csrf";
import { addCardToSectionAction, getProjectSectionsThunk, updateCardSectionAction } from "./sections";

// Action Type
const CREATE_CARDS = "cards/CREATE_CARDS ";
const UPDATE_CARD = "cards/UPDATE_CARD ";

// Action Creators

const createCardAction = (card) => ({
  type: CREATE_CARDS,
  payload: card,
});

const updateCardAction = (card) => ({
  type: UPDATE_CARD,
  payload: card
})


// Thunk action creators
export const createCardThunk = (title, sectionId, projectId) => async (dispatch) => {
  const res = await csrfFetch(`/api/cards`, {
    method: "POST",
    body: JSON.stringify({
        title,
        sectionId,
        projectId
    }),
  });

  if (res.ok) {
    const data = await res.json();
    await dispatch(createCardAction(data));
    await dispatch(getProjectSectionsThunk(projectId))
    return data;
  } else {
    return res.error;
  }
};

export const getCardByIdThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/cards/${id}`)

  if (res.ok) {
    const data = await res.json()
    return data
  }
}


export const updateCardThunk = (id, title, description, sectionId) => async dispatch => {
  const res = await csrfFetch(`/api/cards/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      description
    })
  })

  if (res.ok) {
    const data = await res.json()
    await dispatch(updateCardAction(data))
    await dispatch(updateCardSectionAction(data))
    return data
  }
}

// Initial state

// Reducer
const cardReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case CREATE_CARDS:
      newState = {...state};
      newState[action.payload.id] = action.payload
      return newState;
    case UPDATE_CARD:
      newState = {...state};
      newState[action.payload.id] = action.payload
      return newState
    default:
      return state;
  }
};

export default cardReducer;

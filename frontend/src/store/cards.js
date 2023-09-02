import { csrfFetch } from "./csrf";
import { changeCardSectionAction, getProjectSectionsThunk, updateCardSectionAction } from "./sections";

// Action Type
const CREATE_CARDS = "cards/CREATE_CARDS ";
const UPDATE_CARD = "cards/UPDATE_CARD ";
const MOVE_CARD = 'cards/MOVE_CARD'

// Action Creators

const createCardAction = (card) => ({
  type: CREATE_CARDS,
  payload: card,
});

const updateCardAction = (card) => ({
  type: UPDATE_CARD,
  payload: card
})

const moveSectionCardAction = (card) => ({
  type: MOVE_CARD,
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

export const moveSectionCardThunk = (sectionId, id, projectId) => async dispatch => {
  console.log(projectId)
  const res = await csrfFetch(`/api/cards/${id}/section/${sectionId}`, {
    method: 'PUT',
    body: JSON.stringify({
      sectionId,
      id,
      projectId
    })
  })

  if (res.ok) {
    const data = await res.json()
    await dispatch(moveSectionCardAction(data))
    await dispatch(changeCardSectionAction(sectionId, data))
    await dispatch(getProjectSectionsThunk(projectId))
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
    case MOVE_CARD:
      newState = {...state}
      newState[action.payload.id] = action.payload
      return newState
    default:
      return state;
  }
};

export default cardReducer;

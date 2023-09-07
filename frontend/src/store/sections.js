import { csrfFetch } from "./csrf";

// Action Type
const GET_PROJECT_SECTION = "sections/GET_PROJECT_SECTION ";
const CREATE_SECTION = "sections/CREATE_SECTION";
const DELETE_SECTION = "sections/DELETE_SECTION";
const CARD_SECTION_UPDATE = 'section/CARD_SECTION_UPDATE'
const CHANGE_CARD_SECTION = "sections/CHANGE_CARD_SECTION";
const DELETE_CARD_SECTION = 'section/DELETE_CARD_SECTION';

// Action Creators
const getProjectSectionsAction = (sections) => ({
  type: GET_PROJECT_SECTION,
  payload: sections,
});

export const updateCardSectionAction = (card) => ({
  type: CARD_SECTION_UPDATE,
  payload: card
})

const createSectionAction = (section) => ({
  type: CREATE_SECTION,
  payload: section,
});

const deleteSectionAction = (id) => ({
  type: DELETE_SECTION,
  payload: id,
});

export const changeCardSectionAction = (sectionId, card) => ({
  type: CHANGE_CARD_SECTION,
  payload: {
    sectionId, card
  }
})

export const deleteCardSectionAction = (sectionId, card) => ({
  type: DELETE_CARD_SECTION,
  payload: {
    sectionId, card
  }
})

// Thunk action creators
export const getProjectSectionsThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/projects/${id}/sections`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getProjectSectionsAction(data));
    return data;
  } else {
    return res.error;
  }
};

export const createSectionThunk = (id, name) => async (dispatch) => {
  const res = await csrfFetch(`/api/sections/project/${id}`, {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    await dispatch(createSectionAction(data));
    return data;
  }
};

export const deleteSectionThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/sections/${id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const data = await res.json()
    await dispatch(deleteSectionAction(id))
    // await dispatch(getProjectSectionsThunk(id))
    return data
  }
}

// Initial state

// Reducer
const sectionReducer = (state = {}, action) => {
  let newState;
  let cardArray;
  switch (action.type) {
    case GET_PROJECT_SECTION:
      newState = {};
      action.payload.forEach((section) => (newState[section.id] = section));
      return newState;
    case CREATE_SECTION:
      newState = { ...state };
      newState[action.payload.id] = action.payload
      return newState
    case DELETE_SECTION:
      newState = {...state}
      delete newState[action.payload]
      return newState
    case CARD_SECTION_UPDATE:
      newState = {...state}
      const cards = newState[action.payload.sectionId].Cards

      for (let i = 0; i < cards.length; i++) {
        if (cards[i].id === action.payload.id) {
          cards[i] = action.payload
          break;
        }
      }
      return newState
    case CHANGE_CARD_SECTION:
      newState = {...state}
      cardArray = newState[action.payload.sectionId].Cards
      const cardArrayLength = cardArray.length || 0
      cardArray[cardArrayLength] = action.payload.card
      return newState

    case DELETE_CARD_SECTION:
      newState = {...state}
      cardArray = newState[action.payload.sectionId].Cards
      for (let i = 0; i < cardArray.length; i++) {
        const el = cardArray[i]
        if (el && el.id == action.payload.card.id) {
          delete cardArray[i]
          break;
        }
      }
      return newState
    default:
      return state;
  }
};

export default sectionReducer;

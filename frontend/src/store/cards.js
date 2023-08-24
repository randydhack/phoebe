import { csrfFetch } from "./csrf";

// Action Type
const GET_CARDS = "projects/GET_CARDS ";

// Action Creators

const getProjectSectionsAction = (sections) => ({
  type: GET_CARDS,
  payload: sections,
});

// Thunk action creators
export const getProjectSectionsThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/projects/${id}/cards`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getProjectSectionsAction(data));
    return data;
  } else {
    return res.error;
  }
};



// Initial state

// Reducer
const sectionReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_CARDS:
      newState = {};
      action.payload.forEach((card) => (newState[card.id] = card));
      return newState;
    default:
      return state;
  }
};

export default sectionReducer;

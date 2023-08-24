import { csrfFetch } from "./csrf";

// Action Type
const GET_PROJECT_SECTION = "projects/GET_PROJECT_SECTION ";

// Action Creators

const getProjectSectionsAction = (sections) => ({
  type: GET_PROJECT_SECTION,
  payload: sections,
});

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



// Initial state

// Reducer
const sectionReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_PROJECT_SECTION:
      newState = {};
      action.payload.forEach((section) => (newState[section.id] = section));
      return newState;
    default:
      return state;
  }
};

export default sectionReducer;

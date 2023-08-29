import { csrfFetch } from "./csrf";

// Action Type
const GET_PROJECT_SECTION = "sections/GET_PROJECT_SECTION ";
const CREATE_SECTION = "sections/CREATE_SECTION";
// Action Creators

const getProjectSectionsAction = (sections) => ({
  type: GET_PROJECT_SECTION,
  payload: sections,
});

const createSectionAction = (section) => ({
  type: CREATE_SECTION,
  payload: section,
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

export const createSectionThunk = (id, name) => async (dispatch) => {
  const res = await csrfFetch(`/api/sections/project/${id}`, {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createSectionAction(data));
    return data;
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
    case CREATE_SECTION:
      newState = { ...state };
      console.log(newState);
      newState[action.payload.id] = action.payload
    default:
      return state;
  }
};

export default sectionReducer;

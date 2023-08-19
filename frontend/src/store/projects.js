// Action Type
const GET_USER_PROJECTS = "projects/GET_USER_PROJECTS ";

// Action Creators

const getUserProjectsAction = (projects) => ({
  type: GET_USER_PROJECTS,
  payload: projects,
});

// Thunk action creators
export const userProjectsThunk = () => async (dispatch) => {
  const res = await fetch("/api/projects");

  if (res.ok) {
    const data = await res.json();
    getUserProjectsAction(data);
    return data;
  }
};

// Initial state

// Reducer
const sessionReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_USER_PROJECTS:
      newState = { ...state };
      action.payload.forEach((project) => (newState[project.id] = project));
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;

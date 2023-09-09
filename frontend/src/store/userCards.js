import { csrfFetch } from "./csrf";

// Action Type
const USER_CARDS = 'userCards/USER_CARDS'
// Action Creators

const getAllUserCardsAction = (cards) => ({
    type: USER_CARDS,
    payload: cards
})


// Thunk action creators
export const getAllUserCardsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/cards')

    if (res.ok) {
        const data = await res.json()
        await dispatch(getAllUserCardsAction(data))
        return data
    }
}

// Initial state

// Reducer
const userCardsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
   case USER_CARDS:
    newState = {}
    action.payload.map(card => newState[card.id] = card)
    return newState
    default:
      return state;
  }
};

export default userCardsReducer;

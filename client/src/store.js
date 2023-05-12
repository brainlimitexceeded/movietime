import { createStore } from 'redux';

const initialState = {
  selectedCity: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SELECTED_CITY':
      return {
        ...state,
        selectedCity: action.payload
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;

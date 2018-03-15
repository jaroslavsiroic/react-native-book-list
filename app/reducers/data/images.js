const initialState = [];

export default function bookReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_IMAGE':
      state = Object.assign([], state);
      state.push(payload);
    break;
    case 'DELETE_IMAGE':
      state = Object.assign([], state);
      for (var i = 0; i < state.length; i++) {
        if (state[i].id === payload) {
          state.splice(i, 1);
          break;
        }
      }
    break;
  }
  return state;
}
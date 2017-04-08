const initialState = [];

export default function bookReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_BOOK':
      state = Object.assign([], state);
      payload.id = + new Date();
      payload.alreadyRead = false;
      state.push(payload);
    break;
    case 'DELETE_BOOK':
      state = Object.assign([], state);
      for (var i = 0; i < state.length; i++) {
        if (state[i].id === payload) {
          state.splice(i, 1);
          break;
        }
      }
    break;
    case 'EDIT_BOOK':
      state = Object.assign([], state);
      for (var i = 0; i < state.length; i++) {
        if (state[i].id === payload.id) {
          state[i] = payload;
          break;
        }
      }
    break;
  }
  return state;
}
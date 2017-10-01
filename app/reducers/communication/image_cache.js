const initialState = [];

export default function imageCacheReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_CACHE_INFO':
      state = Object.assign([], state);
      state.push(payload);
    break;
  }
  return state;
}
const initialState = [];

export default function imageCacheReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_CACHE_INFO':
      state = Object.assign([], state);
      state = payload.hits;
      for(let i=0; i<state.length; i++) {
        state[i].key = state[i].id;
      }
      console.log(state);
    break;
  }
  return state;
}

const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

const counterReducer = (state = initialState, action) => {

  console.log(action);

  switch (action.type) {
    case 'GOOD':
      // @TODO: how to make this smarter?
      return {
        ...state,
        good: state.good + 1,
      };
    case 'OK':
      // @TODO: how to make this smarter?
      return {
        ...state,
        ok: state.ok + 1,
      };
    case 'BAD':
      // @TODO: how to make this smarter?
      return {
        ...state,
        bad: state.bad + 1,
      };
    case 'ZERO':
      let newState = {
        good: 0,
        ok: 0,
        bad: 0,
      };
      return newState;
    default: return state;
  }
  
}

export default counterReducer;

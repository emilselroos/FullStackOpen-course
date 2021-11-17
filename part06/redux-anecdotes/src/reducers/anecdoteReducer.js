
import anecdotesService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote.content,
    id: getId(),
    votes: anecdote.votes,
  };
};

const initialState = [].map(asObject);

const anecdoteReducer = (state = [], action) => {
  
  console.log('State now: ', state);
  console.log('Action: ', action);

  switch (action.type) {

    case 'VOTE':

      const id = action.data.id;
      const anecdoteToChange = state.find(anecdote => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote);

    case 'CREATE_ANECDOTE':
      return [ ...state, action.data ];

    case 'INITIALIZE_ANECDOTES':
      return action.data;

    default:
      return state;
  };
};

export const vote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.updateOne({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
  }
};

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(anecdote)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    })
  }
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    console.log(anecdotes)
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: anecdotes,
    })

  }
}

export default anecdoteReducer;

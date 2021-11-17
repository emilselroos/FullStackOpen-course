
const initialState = {
	message: null,
	time: 0,
};

const notificationReducer = (state = initialState, action) => {

	// console.log('Current notification: ', state);

	switch (action.type) {

		case 'SET_NOTIFICATION':
			return action.data;

		default:
			return state;

	};
};

export const setNotification = (message, time) => {
	return async dispatch => {
		dispatch({
		  type: 'SET_NOTIFICATION',
		  data:  {
			  message: message,
			  time: time * 1000,
		  },
		});
	}
}

export default notificationReducer;
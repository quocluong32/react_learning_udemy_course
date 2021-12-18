import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import authReducer from './auth';






/* const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return {
            counter: state.counter + action.amount,
            showCounter: state.showCounter
        }
    }

    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1,
            showCounter: state.showCounter
        }
    }

    if (action.type === 'toggle') {
        return {
            ...state,
            showCounter: !state.showCounter
        }
    }

    return state;
} */

const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer
    }
});


export default store;


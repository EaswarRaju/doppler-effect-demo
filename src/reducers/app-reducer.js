import { UPDATE_VELOCITY } from "../actions/app-actions";

const initialState = {
    velocity: 0
};
  
export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_VELOCITY: 
            return {
                ...state,
                velocity: action.velocity
            };

        default: return state;
    }
};
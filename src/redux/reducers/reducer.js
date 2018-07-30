import * as types from '../constants/actionTypes';

const initialState = {
    click: false
};

const reducer=(state = initialState, action)=>{
    switch(action.type){
        case types.CLICK_BUTTON:
            return { ...state, click: true};
        default:
            return state;
    }
};

export default reducer;

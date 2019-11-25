import { updateReducer, ReduxAction, SET, INIT, SUCCESS } from '../../utils';
import {
    CLEAR_WHITE_LABEL,
    SET_WHITE_LABEL,
    API_GET_WHITE_LABEL,
} from '../actions/whitelabel/WhiteLabelTypes';

const initialState = {
    statusMessage: 'INIT',
    error: {},
    whiteLabel: {},
};

const whitelabel = (state = initialState, action: ReduxAction) => {
    switch (action.type) {
        case CLEAR_WHITE_LABEL:
            return initialState;
        case SET_WHITE_LABEL:
            return updateReducer(state, INIT, { whiteLabel: action.payload }, SET);
        case API_GET_WHITE_LABEL.SUCCESS:
            return updateReducer(state, SUCCESS, { whiteLabel: action.payload }, SET);

        default:
            return state;
    }
}

export default whitelabel;

import { createActionHelper, createRequestHelper } from '../../../utils';
import { WhiteLabelService } from '../../../services';
import { CLEAR_WHITE_LABEL, SET_WHITE_LABEL, API_GET_WHITE_LABEL } from './WhiteLabelTypes';

export const clearWhiteLabel = createActionHelper(CLEAR_WHITE_LABEL);

export const setWhiteLabel = createActionHelper(SET_WHITE_LABEL);

export const getWhiteLabelRequest = () =>
    createRequestHelper(API_GET_WHITE_LABEL, WhiteLabelService.getWhiteLabel);

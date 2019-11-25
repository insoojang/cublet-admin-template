import client from '../../client';

export const WHITELABEL_URL = {
    API_NOAUTH_WHITE_LABEL: '/api/noauth/white-label',
};

export const getWhiteLabel = () => client.get(WHITELABEL_URL.API_NOAUTH_WHITE_LABEL, null, null, null, true);

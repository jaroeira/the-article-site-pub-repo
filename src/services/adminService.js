import fetchHelper from './fetchHelper';
import qsStringify from 'qs-stringify';
import { config } from '../helpers/constants';

const baseUrl = `${config.url.API_BASE_URL}`;

const getCollectionDocsCounter = ({ token }) => {
    return fetchHelper.get({ url: `${baseUrl}/docs/get-count`, token: token });
};

const getUsers = ({ token, pageOptions = {}, query = {} }) => {
    const params = qsStringify({ pageOptions, query });
    return fetchHelper.get({ url: `${baseUrl}/user/get-users?${params}`, token: token });
};

const getUser = ({ token, userId }) => {
    return fetchHelper.get({ url: `${baseUrl}/user/get-user?userId=${userId}`, token: token });
};

const updateUser = ({ token, userData }) => {
    return fetchHelper.put({ url: `${baseUrl}/user/update`, token, body: { ...userData } });
};

const createUser = ({ token, userData }) => {
    return fetchHelper.post({ url: `${baseUrl}/user/create`, token, body: { ...userData } });
};

const deleteUser = ({ token, userId }) => {
    return fetchHelper.deleteMethod({ url: `${baseUrl}/user/delete`, token, body: { userId } });
};

const adminService = {
    getCollectionDocsCounter,
    getUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser
};

export default adminService;


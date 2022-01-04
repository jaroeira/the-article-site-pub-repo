import fetchHelper from './fetchHelper';
import qsStringify from 'qs-stringify';
import { config } from '../helpers/constants';

const baseUrl = `${config.url.API_BASE_URL}/articles`;

const createArticle = ({ token, title, content, description, tags, uploadedImageNames }) => {
    console.log('uploadedImageNames', uploadedImageNames);
    return fetchHelper.post({ url: `${baseUrl}/create`, body: { title, content, description, tags, uploadedImageNames }, token });
};

const getArticles = ({ pageOptions = {}, query = {} }) => {
    const params = qsStringify({ pageOptions, query });
    return fetchHelper.get({ url: `${baseUrl}?${params}` });
};

const getArticleById = ({ articleId, userId }) => {
    const params = qsStringify({ articleId, userId });
    return fetchHelper.get({ url: `${baseUrl}/get-article-by-id?${params}` });
};

const uploadImage = ({ token, formData }) => {
    return fetchHelper.post({ url: `${baseUrl}/upload-image`, body: formData, token, isFormData: true });
};

const updateArticle = ({ token, formData }) => {
    return fetchHelper.put({ url: `${baseUrl}/update-article`, body: { ...formData }, token });
};

const deleteArticle = ({ token, articleId }) => {
    return fetchHelper.deleteMethod({ url: `${baseUrl}/delete-article`, token, body: { articleId } });
};

const likeArticle = ({ token, articleId }) => {
    return fetchHelper.post({ url: `${baseUrl}/like-article`, token, body: { articleId } });
};

const articleService = {
    createArticle,
    getArticles,
    getArticleById,
    uploadImage,
    updateArticle,
    deleteArticle,
    likeArticle
};

export default articleService;
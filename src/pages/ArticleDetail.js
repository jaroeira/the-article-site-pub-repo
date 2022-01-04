import classes from './ArticleDetail.module.scss';
import Tag from '../components/UI/TagInput/Tag';
import { useEffect, Fragment, useState } from 'react';
import { useParams, Link, useHistory, useLocation } from 'react-router-dom';
import htmlParser from 'html-react-parser';

//UI
import Loading from '../components/UI/Loading';
import Error from '../components/UI/Error';
import AvatarImage from '../components/UI/AvatarImage';
import IconButton from '../components/UI/IconButton/IconButton';
import Modal from '../components/UI/Modal/Modal';
import { useToasts } from '../components/UI/Toast/ToastProvider';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getArticleById, articleActions, articleSelector, deleteArticle, likeArticle } from '../store/article-slice';
import { authSelector, bookmarkArticle } from '../store/auth-slice';

//Page
import PageNotFound from './PageNotFound';

const ArticleDetail = props => {

    const { id } = useParams();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { articleDetail, isFetching, isSuccess, isError, errorMessage, didDeleteArticle, articleDetailLiked, isLoadingLike } = useSelector(articleSelector);
    const { isAuthenticated, token, role, userId, bookmarks, isLoadingBookmarks } = useSelector(authSelector);

    const { creator } = articleDetail;

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const { addToast } = useToasts();

    useEffect(() => {
        dispatch(articleActions.clearFetchState());

        dispatch(getArticleById({ articleId: id, userId }));

        return () => dispatch(articleActions.clearFetchState());
    }, [dispatch, id, userId]);

    //Check if article is bookmarked
    useEffect(() => {
        if (bookmarks.includes(id)) {
            setIsBookmarked(true);
        } else {
            setIsBookmarked(false);
        }
    }, [bookmarks, id]);

    //On Error
    useEffect(() => {
        if (isError) {
            addToast({ type: 'error', text: errorMessage, autoDismiss: true, autoDismissTimeout: 5000 });
        }
    }, [isError, addToast, errorMessage]);

    //on delete success
    useEffect(() => {
        if (isSuccess && didDeleteArticle) {
            addToast({ type: 'success', text: 'Article successfully deleted', autoDismiss: true, autoDismissTimeout: 3000 });
            history.replace('/');
        }
    }, [addToast, didDeleteArticle, isSuccess, history]);

    const confirmDeleteHandler = () => {
        console.log('confirm delete');

        dispatch(deleteArticle({ token, articleId: articleDetail.id }));

        setIsDeleteModalOpen(false);
    };

    const likeButtonClickHandler = () => {
        if (isAuthenticated) {
            dispatch(likeArticle({ token, articleId: id }));
        } else {
            history.push('/auth', { from: location });
        }
    };

    const bookmarkClickHandler = () => {
        if (isAuthenticated) {
            dispatch(bookmarkArticle({ token, articleId: id }));
        } else {
            history.push('/auth', { from: location });
        }
    };

    return (
        <Fragment>
            {isFetching && <Loading />}
            {!isFetching && isError && errorMessage === 'Article not found or invalid id' && <PageNotFound title='Article not found' message={'Sorry! We can\'t find the article you are looking for.'} />}
            {!isFetching && isError && errorMessage !== 'Article not found or invalid id' && <Error message={errorMessage} />}
            {!isFetching && isSuccess &&
                <div className={classes.articleDetail}>
                    <div className={classes['articleDetail__author-container']}>
                        <AvatarImage size='md' imageUrl={creator?.avatarImage?.imageUrl} text={creator?.displayName} />
                    </div>
                    <h1 className={`heading-1 ${classes.articleDetail__title}`}>{articleDetail.title}</h1>
                    <div className={classes.articleDetail__actions}>
                        <IconButton
                            showLabel={false}
                            iconName='heart'
                            label='Like'
                            clicked={likeButtonClickHandler}
                            isLoading={isLoadingLike}
                            fillColor={articleDetailLiked ? '#ce2897' : '#03A9F4'}
                        />


                        <IconButton
                            showLabel={false}
                            iconName='bookmark'
                            fillColor={isBookmarked ? '#ad7cef' : '#03A9F4'}
                            label={isBookmarked ? 'Bookmarked' : 'Bookmark'}
                            isLoading={isLoadingBookmarks}
                            clicked={bookmarkClickHandler} />

                        {((isAuthenticated && role === 'Admin') || (isAuthenticated && role === 'Editor' && userId === creator.id)) && <>
                            <IconButton showLabel={false} iconName='edit' label='Edit' clicked={() => history.push(`/edit-article/${id}`)} />
                            <IconButton showLabel={false} iconName='cup' label='Delete' fillColor='#ac292f' clicked={() => setIsDeleteModalOpen(true)} /> </>}
                    </div>
                    <div className={classes.articleDetail__tagsContainer}>
                        {articleDetail.tags && articleDetail.tags.map((tag, index) => (
                            <Link to={`/articles/search/${tag}`} key={index} style={{ textDecoration: 'none' }}>
                                <Tag value={tag} showRemoveButton={false} />
                            </Link>
                        ))}
                    </div>
                    <div className={classes.articleDetail__content}>
                        {htmlParser(`${articleDetail.content}`)}
                    </div>
                </div>
            }
            <Modal title='Are you sure?'
                isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeleteHandler}
            >
                <p style={{ color: 'red' }}>Please confirm you want to delete the following article:</p>
                <p>{articleDetail.title}</p>
            </Modal>
        </Fragment>
    );
};

export default ArticleDetail;
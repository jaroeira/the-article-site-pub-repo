import classes from './PaginatedArticles.module.scss';
import { useEffect, useRef } from 'react';

//UI
import sprite from '../../assets/sprite.svg';
import SectionCardList from '../UI/SectionCardList';
import Paginator from '../UI/Paginator';
import Loading from '../UI/Loading';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { articleActions, getPaginatedArticles, articleSelector } from '../../store/article-slice';

const PaginatedArticles = props => {

    const {
        title,
        query = {},
        noArticlesText = 'No articles',
        noArticlesTitle = 'No articles to be displayed',
        noArticlesIconName = 'magnifying-glass'
    } = props;

    const queryRef = useRef({ ...query });

    const dispatch = useDispatch();
    const { paginatedArticles, isFetching } = useSelector(articleSelector);

    //On first load
    useEffect(() => {
        dispatch(articleActions.clearFetchState());
        dispatch(getPaginatedArticles({ query: queryRef.current, page: 1 }));

        return () => dispatch(articleActions.clearFetchState());
    }, [dispatch]);

    const nextPageClickHandler = () => {
        if (paginatedArticles.hasNextPage) {
            dispatch(getPaginatedArticles({ query, page: paginatedArticles.nextPage }));
        }
    };

    const previousPageClickHandler = () => {
        if (paginatedArticles.hasPrevPage) {
            dispatch(getPaginatedArticles({ query, page: paginatedArticles.prevPage }));
        }
    };

    const pageClickHandler = (page) => {
        dispatch(getPaginatedArticles({ query, page }));
    };

    //Scroll to Top on every new page loaded
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [paginatedArticles]);

    return (
        <div>
            {isFetching && <Loading />}

            {!isFetching && paginatedArticles.totalDocs === 0 &&
                <div className={classes['paginatedArticles__no-articles']}>
                    <svg className={classes['paginatedArticles__no-articles-icon']}>
                        <use href={sprite + '#icon-' + noArticlesIconName}></use>
                    </svg>
                    <h2 className={classes['paginatedArticles__no-articles-title']}>{noArticlesTitle}</h2>
                    <p className={classes['paginatedArticles__no-articles-text']}>{noArticlesText}</p>
                </div>
            }

            {!isFetching && paginatedArticles.totalDocs > 0 &&
                <>
                    <SectionCardList title={title} articles={paginatedArticles.docs} loading={isFetching} />
                    {paginatedArticles.totalPages > 1 &&
                        <Paginator
                            totalPages={paginatedArticles.totalPages}
                            currentPage={paginatedArticles.page}
                            nextPageClicked={nextPageClickHandler}
                            previousPageClicked={previousPageClickHandler}
                            pageClicked={pageClickHandler}
                        />}
                </>}

        </div>
    );
};

export default PaginatedArticles;
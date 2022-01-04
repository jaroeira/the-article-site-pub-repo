import { Fragment, useEffect } from 'react';
import SectionCardList from '../components/UI/SectionCardList';

import { useDispatch, useSelector } from 'react-redux';
import { articleActions, getLastArticles, getTopArticles, articleSelector } from '../store/article-slice';

const Home = props => {

    const dispatch = useDispatch();
    const { lastArticles, topArticles, isFetching } = useSelector(articleSelector);

    useEffect(() => {
        return () => dispatch(articleActions.clearFetchState());
    }, [dispatch]);

    useEffect(() => {
        dispatch(articleActions.clearFetchState());
        if (lastArticles.length === 0) {
            console.log('loading lastest articles');
            dispatch(getLastArticles({ limit: 6 }));
        }
    }, [dispatch, lastArticles.length]);

    useEffect(() => {
        dispatch(articleActions.clearFetchState());
        if (topArticles.length === 0) {
            console.log('loading top articles');
            dispatch(getTopArticles());
        }
    }, [dispatch, topArticles.length]);

    return (
        <Fragment>
            <SectionCardList title={'Top Articles'} articles={topArticles} loading={isFetching} />
            <SectionCardList title={'Lastest Articles'} articles={lastArticles} loading={isFetching} />
        </Fragment>
    );
};

export default Home;
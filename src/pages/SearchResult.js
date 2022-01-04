import classes from './SearchResult.module.scss';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PaginatedArticles from '../components/PaginatedArticles/PaginatedArticles';

//Redux
import { useSelector } from 'react-redux';
import { articleSelector } from '../store/article-slice';

const SearchResult = props => {

    const { searchTerms } = useSelector(articleSelector);

    const { tag } = useParams();
    const [currentSearchTerm, setCurrentSeachTerm] = useState(null);

    useEffect(() => {

        if (tag) {
            setCurrentSeachTerm({ tag: tag });
        } else {
            console.log('search result search term', searchTerms);
            setCurrentSeachTerm(searchTerms);
        }


    }, [tag, searchTerms]);

    return (

        <div className={classes.searchResult}>

            {currentSearchTerm != null &&
                <PaginatedArticles
                    query={currentSearchTerm}
                    title='Search result'
                    noArticlesTitle={`Sorry we couldn't find any article`}
                    noArticlesText='Plase try searching with another term'
                    noArticlesIconName='magnifying-glass'
                />}

        </div>

    );
};

export default SearchResult;
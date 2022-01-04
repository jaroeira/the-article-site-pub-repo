import classes from './MyBookmarks.module.scss';

//UI
import PaginatedArticles from '../components/PaginatedArticles/PaginatedArticles';

//Redux
import { useSelector } from 'react-redux';
import { authSelector } from '../store/auth-slice';

const MyBookmarks = props => {

    const { bookmarks } = useSelector(authSelector);

    return (
        <div className={classes.myBookmarks}>
            <PaginatedArticles
                query={{ bookmarks: bookmarks.length > 0 ? bookmarks : ['empty'] }}
                title='My Bookmarks'
                noArticlesText=''
                noArticlesTitle={`You dont't have bookmarked articles`}
                noArticlesIconName='bookmark'
            />
        </div>
    );
};

export default MyBookmarks;
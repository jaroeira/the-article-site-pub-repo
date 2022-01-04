import classes from './MyArticles.module.scss';
import { useSelector } from 'react-redux';
import { authSelector } from '../store/auth-slice';

import PaginatedArticles from '../components/PaginatedArticles/PaginatedArticles';

const MyArticles = props => {

    const { userId } = useSelector(authSelector);

    return (
        <div className={classes.myArticles}>
            <PaginatedArticles
                title='My Articles'
                query={{ userId: userId }}
            />
        </div>
    );
};

export default MyArticles;
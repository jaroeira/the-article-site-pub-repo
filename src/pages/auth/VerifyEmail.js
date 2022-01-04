import classes from './VerifyEmail.module.scss';
import { Link, useLocation } from 'react-router-dom';
import sprite from '../../assets/sprite.svg';
import Loading from '../../components/UI/Loading';
import Error from '../../components/UI/Error';
import { useEffect } from 'react';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { authSelector, authActions, verifyEmail } from '../../store/auth-slice';

const VerifyEmail = props => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    const dispatch = useDispatch();
    const { isFetching, isError, isSuccess, errorMessage } = useSelector(authSelector);

    useEffect(() => {
        dispatch(authActions.clearFetchState());
        dispatch(verifyEmail(token));
        return () => dispatch(authActions.clearFetchState());
    }, [dispatch, token]);

    const success = (
        <section className={classes.verifyEmail}>
            <div className={classes.verifyEmail__container}>
                <div className={classes['verifyEmail__icon-container']}>
                    <svg className={classes.verifyEmail__icon}>
                        <use href={sprite + '#icon-check'}></use>
                    </svg>
                </div>
                <h2 className={`heading-2 ${classes.verifyEmail__title}`}>Email Verified</h2>
                <p className={classes.verifyEmail__text}>Your email address was successfully verified.</p>
                <Link to='/auth?mode=signin' className={`btn btn--blue`}>Go to Sign-In Page</Link>
            </div>
        </section>
    );

    const buildState = () => {
        if (isFetching) {
            return <Loading />;
        }
        else if (!isFetching && isSuccess && !isError) {
            return success;
        } else if (!isFetching && isError && errorMessage) {
            return <Error message={errorMessage} />
        } else if (!isFetching && isError && (!errorMessage || errorMessage === '')) {
            return <Error message='Unknown error' />;
        }

        return <Loading />;
    };

    return buildState();
};

export default VerifyEmail;
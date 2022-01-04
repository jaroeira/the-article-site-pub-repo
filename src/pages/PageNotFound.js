import classes from './PageNotFound.module.scss';
import { Link } from 'react-router-dom';
import sprite from '../assets/sprite.svg';

const PageNotFound = props => {

    const { title, message } = props;

    return (
        <section className={classes.pageNotFound}>
            <svg className={classes.pageNotFound__icon}>
                <use href={sprite + '#icon-browser'}></use>
            </svg>
            <div className={classes.pageNotFound__container}>
                <h2 className={classes.pageNotFound__title}>{title ? title : 'Page Not Found'}</h2>
                <p className={classes.pageNotFound__text}>
                    {message ? message : 'Sorry! We can\'t find the page you are looking for.'}
                </p>
                <Link to='/' className={`btn btn--blue ${classes.pageNotFound__btn}`}>Go to the main page</Link>
            </div>
        </section>
    );
};

export default PageNotFound;
import classes from './Error.module.scss';
import sprite from '../../assets/sprite.svg';

const Error = props => {
    return (
        <div className={classes.error}>

            <div className={classes.error__container}>
                <svg className={classes.error__icon}>
                    <use href={sprite + '#icon-circle-with-cross'}></use>
                </svg>
                <h2 className={classes.error__title}>Error</h2>
            </div>
            <p className={classes.error__text}>
                {props.message}
            </p>
        </div>
    );
};

export default Error;
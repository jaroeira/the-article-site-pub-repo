import classes from './Loading.module.scss';
import spinner from '../../assets/SVG/spinner.svg';

const Loading = props => {
    return (
        <div className={classes.loading}>
            <img src={spinner} className={classes.loading__spinner} alt='Loading' />
            <p className={classes.loading__text}>Loading</p>
        </div>
    );
};

export default Loading;
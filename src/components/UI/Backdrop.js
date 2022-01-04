import classes from './Backdrop.module.scss';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.clicked} style={props.styles}></div>;
};

export default Backdrop;
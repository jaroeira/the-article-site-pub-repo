import classes from './Card.module.scss';

const Card = props => {
    return (
        <article className={classes.card} style={props.styles}>{props.children}</article>
    );
};

export default Card;
import classes from './IconButton.module.scss';
import sprite from '../../../assets/sprite.svg';

const IconButton = props => {

    const {
        clicked,
        iconName = 'emoji-happy',
        fillColor = '#03A9F4',
        label,
        showLabel = true,
        isLoading = false,
        loadingIconColor = '#03A9F4'
    } = props;

    return (
        <button className={classes.iconButton} onClick={clicked} disabled={isLoading}>
            {isLoading &&
                <svg className={`${classes['iconButton__icon']}`} style={{ fill: loadingIconColor }} >
                    <use href={sprite + '#icon-cycle'}></use>
                </svg>
            }
            {!isLoading &&
                <svg className={`${classes['iconButton__icon']}`} style={{ fill: fillColor }} >
                    <use href={sprite + '#icon-' + iconName}></use>
                </svg>}
            {showLabel && <h4 className={classes.iconButton__label}>{label}</h4>}
        </button>
    );
};

export default IconButton;
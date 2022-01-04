import classes from './MenuToggleButton.module.scss';

const MenuToggleButton = props => {

    const buttonStyle = `${classes.menuToggleButton} ${props.hideOnDesktop ? classes['hide-on-desktop'] : ''} ${props.isOpen ? classes['menuToggleButton--close-x'] : ''}`;

    return (
        <button className={buttonStyle} onClick={props.clicked}>
            <span className={classes.menuToggleButton__bar}></span>
            <span className={classes.menuToggleButton__bar}></span>
            <span className={classes.menuToggleButton__bar}></span>
        </button>
    );
};

export default MenuToggleButton;
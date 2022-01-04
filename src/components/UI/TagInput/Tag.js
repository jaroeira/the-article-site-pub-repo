import classes from './Tag.module.scss';

const Tag = props => {

    const { value, index, remove, showRemoveButton } = props;

    return (
        <div className={classes.tag}>
            <div className={classes.tag__content} style={showRemoveButton ? { paddingRight: '.4rem' } : null}>
                {value}
            </div>
            {showRemoveButton && <div className={classes.tag__remove} onClick={() => remove(index)}></div>}
        </div>
    );
};

export default Tag;
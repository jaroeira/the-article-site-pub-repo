import classes from './Popover.module.scss';
import { Fragment } from 'react';
import Backdrop from '../Backdrop';
import Card from '../Card';

const Popover = props => {


    return (
        <Fragment>
            <div className={classes.popover}>
                <Card styles={{ zIndex: '2001' }}>
                    <div className={classes.popover__content}>
                        <h3 className={classes.popover__title}>{props.title}</h3>
                        <p className={classes.popover__text}>{props.children}</p>
                        <button className={`btn btn--blue ${classes.popover__btn}`} onClick={props.clicked}>ok</button>
                    </div>
                </Card>
            </div>
            <Backdrop styles={{ zIndex: '2000' }} />
        </Fragment>
    );
};

export default Popover;
import classes from './Toast.module.scss';
import sprite from './sprite.svg';
import { useEffect, useRef } from 'react';

const appearance = {
    success: {
        iconName: '#icon-check',
        bgColor: '#def2d5',
        color: '#577153',
        defaultTitle: 'Success'
    },
    info: {
        iconName: '#icon-info-with-circle',
        bgColor: '#cce8f5',
        color: '#4b81a6',
        defaultTitle: 'Info'
    },
    warning: {
        iconName: '#icon-warning',
        bgColor: '#f8f3d7',
        color: '#90703b',
        defaultTitle: 'Warning'
    },
    error: {
        iconName: '#icon-block',
        bgColor: '#ebc8c4',
        color: '#ac292f',
        defaultTitle: 'Error'
    }
};

const getAppearane = (type) => {
    switch (type) {
        case 'success':
            return appearance.success;
        case 'info':
            return appearance.info;
        case 'warning':
            return appearance.warning;
        case 'error':
            return appearance.error;
        default:
            return appearance.info;
    }
};



const Toast = props => {

    const {
        type,
        title,
        text,
        hideTitle,
        onClose,
        itemRef,
        transitionState,
        position,
        autoDismiss = false,
        autoDismissTimeout = 5000,
        animationTimeout
    } = props;

    const { iconName, bgColor, color, defaultTitle } = getAppearane(type);

    const onCloseRef = useRef(onClose);


    //If autoDissmiss === true create a timeout
    useEffect(() => {

        let timeout;

        if (autoDismiss) {

            timeout = setTimeout(() => {
                onCloseRef.current();
            }, autoDismissTimeout);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [autoDismiss, autoDismissTimeout, onCloseRef]);

    //Return the entering position of the toast based on the flow direction of the toast list, from top, from bottom, from right etc
    const getEnteringPosition = position => {

        const pos = position.split('-');
        //if toast are appearen from top, right, left or bottom
        const comingFromPosition = pos[1] === 'center' ? pos[0] : pos[1];

        const translateMap = {
            right: 'translate3d(120%, 0, 0)',
            left: 'translate3d(-120%, 0, 0)',
            bottom: 'translate3d(0, 150%, 0)',
            top: 'translate3d(0, -140%, 0)',
        };

        return translateMap[comingFromPosition];
    };


    const getTransitionForState = state => {

        switch (state) {
            case 'entering':
                return { transform: getEnteringPosition(position) };
            case 'entered':
                return { transform: 'translate3d(0,0,0)' };
            case 'exiting':
                return { transform: 'scale(0.66)', opacity: 0 };
            case 'exited':
                return { transform: 'scale(0.66)', opacity: 0 };
            default:
                return {};
        }
    };

    return (
        <div ref={itemRef} className={classes.wrapper} >
            <div className={classes.toast}
                style={{
                    backgroundColor: bgColor, color: color, border: `1px solid ${color}`,
                    ...getTransitionForState(transitionState),
                    transition: `all ${animationTimeout}ms ease-in`
                }} >

                <div className={classes['toast__icon-container']}>
                    <svg className={classes.toast__icon} style={{ fill: color }}>
                        <use href={sprite + iconName}></use>
                    </svg>
                </div>

                <div className={classes.toast__content}>
                    <span className={classes.toast__title}
                        style={hideTitle ? { display: 'none' } : {}}
                    >{title ? title : defaultTitle}:</span>{text}
                </div>

                <div className={classes['toast__button-container']}>
                    <svg className={classes.toast__button} style={{ fill: color }} onClick={onClose}>
                        <use href={sprite + '#icon-cross'}></use>
                    </svg>
                </div>

            </div>
        </div >
    );
};

export default Toast;
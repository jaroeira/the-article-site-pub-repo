import classes from './LoadingPopover.module.scss';
import { Fragment, useRef } from 'react';
import { createPortal } from 'react-dom';
import Backdrop from '../Backdrop';
import Card from '../Card';
import spinner from '../../../assets/SVG/spinner.svg';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const popoverRoot = document.getElementById('popover-root');

const LoadingPopover = props => {

    const { loadingText, isLoading = true } = props;

    const nodeRef = useRef(null);

    return (
        createPortal(
            <Fragment>
                <TransitionGroup component={null}>
                    {isLoading && (
                        <CSSTransition timeout={300} nodeRef={nodeRef} mountOnEnter unmountOnExit
                            classNames={{
                                enter: classes['loadingPopover-enter'],
                                enterActive: classes['loadingPopover-enter-active'],
                                exit: classes['loadingPopover-exit'],
                                exitActive: classes['loadingPopover-exit-active'],
                            }}
                        >
                            <div className={classes.loadingPopover} ref={nodeRef}>
                                <Card styles={{ zIndex: '2001' }}>
                                    <div className={classes.loadingPopover__container}>
                                        <img src={spinner} className={classes.loadingPopover__spinner} alt='Loading' />
                                        <p className={classes.loadingPopover__text}>{loadingText || 'Loading...'}</p>
                                    </div>
                                </Card>
                            </div>
                        </CSSTransition>
                    )}
                </TransitionGroup>
                {isLoading && <Backdrop className={classes.loadingPopover__backdrop} styles={{ zIndex: '2000' }} />}
            </Fragment>,
            popoverRoot
        )
    );
};

export default LoadingPopover;
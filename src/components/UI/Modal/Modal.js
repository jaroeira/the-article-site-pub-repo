import classes from './Modal.module.scss';
import sprite from '../../../assets/sprite.svg';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Card from '../Card';
import Backdrop from '../Backdrop'

const modalRoot = document.getElementById('modal-root');

const Modal = props => {

    const {
        title,
        isOpen = false,
        showDismissButton = true,
        dissmissLabel = 'Cancel',
        confirmLabel = 'Confirm',
        backdropDismiss = false,
        onClose,
        onConfirm,
        hideFooter = false
    } = props;


    const nodeRef = useRef(null);

    return (
        createPortal(
            <>
                <CSSTransition in={isOpen} timeout={300} mountOnEnter unmountOnExit nodeRef={nodeRef}
                    classNames={{
                        enter: classes['modal-enter'],
                        enterActive: classes['modal-enter-active'],
                        exit: classes['modal-exit'],
                        exitActive: classes['modal-exit-active'],
                    }}
                >

                    <div className={classes.modal} role='dialog' ref={nodeRef}>
                        <Card>
                            <div className={classes.modal__header}>
                                <div className={classes['modal__title-container']}>
                                    <h4 className={classes.modal__title}>{title}</h4>
                                </div>
                                <button className={classes['modal__icon-close-button']} onClick={onClose}>
                                    <svg className={classes['modal__icon-close']}>
                                        <use href={sprite + '#icon-cross'}></use>
                                    </svg>
                                </button>
                            </div>
                            <div className={classes.modal__body}>
                                {props.children}
                            </div>
                            {!hideFooter &&
                                <div className={classes.modal__footer}>
                                    {showDismissButton && <button className={`${classes.modal__button} ${classes['modal__button--white']}`} onClick={onClose}>{dissmissLabel}</button>}
                                    <button className={`${classes.modal__button} ${classes['modal__button--blue']}`} onClick={onConfirm}>{confirmLabel}</button>
                                </div>
                            }
                        </Card>
                    </div >

                </CSSTransition>

                {isOpen && <Backdrop clicked={backdropDismiss ? onClose : null} />}

            </>,
            modalRoot
        )
    );

};

export default Modal;
import classes from './ToastProvider.module.scss';
import { createContext, useState, useContext, createRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Toast from './Toast';
import { TransitionGroup, Transition } from 'react-transition-group';
import { createPortal } from 'react-dom';

const toastRoot = document.getElementById('toast-root');

const ANIMATION_TIMEOUT = 200;

const toastContext = createContext();
const { Provider } = toastContext;

const toastsContainerPosition = {
    'top-left': { top: 0, left: 0 },
    'top-center': { top: 0, left: '50%', transform: 'translateX(-50%)' },
    'top-right': { top: 0, right: 0 },
    'bottom-left': { bottom: 0, left: 0 },
    'bottom-center': { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
    'bottom-right': { bottom: 0, right: 0 }
};

const getContainerPosition = position => {
    return toastsContainerPosition[position] ? toastsContainerPosition[position] : toastsContainerPosition['bottom-center'];
};

export const ToastProvider = props => {

    const { position = 'bottom-center', children } = props;

    //State where toasts are stored
    const [toasts, setToasts] = useState([]);

    const containerPosition = getContainerPosition(position);

    const addToast = useCallback(({ type, title, text, hideTitle, autoDismiss, autoDismissTimeout }) => {
        const id = uuidv4();
        const newToast = { type, title, text, hideTitle, autoDismiss, autoDismissTimeout, id };

        setToasts(prevState => {
            const toasts = [...prevState, newToast];
            return toasts;
        });
    }, []);

    const idExists = useCallback((id) => {
        if (toasts.length === 0) return false;
        return toasts.filter(toast => toast.id === id).length > 0;
    }, [toasts]);

    const removeToast = useCallback((id) => {

        if (!idExists(id)) return;

        setToasts(prevState => {
            const filteredToasts = prevState.filter(toast => toast.id !== id);
            return filteredToasts;
        });

    }, [idExists]);


    return (
        <Provider value={{ addToast, removeToast, toasts }}>
            {children}
            {createPortal(
                <TransitionGroup
                    className={`${classes.toastProvider__container} ${position === 'top-center' ? classes['toastProvider__container--top-position'] : ''}`}
                    style={{ ...containerPosition }}>
                    {toasts.map(toast => {
                        const itemRef = createRef(null);

                        return (<Transition
                            appear
                            mountOnEnter
                            unmountOnExit
                            timeout={ANIMATION_TIMEOUT}
                            key={toast.id}
                            nodeRef={itemRef}>
                            {transitionState => (
                                <Toast
                                    position={position}
                                    itemRef={itemRef}
                                    transitionState={transitionState}
                                    key={toast.id}
                                    type={toast.type}
                                    text={toast.text}
                                    autoDismiss={toast.autoDismiss}
                                    autoDismissTimeout={toast.autoDismissTimeout}
                                    animationTimeout={ANIMATION_TIMEOUT}
                                    onClose={() => removeToast(toast.id)} />
                            )
                            }
                        </Transition>);
                    })}
                </TransitionGroup>, toastRoot
            )}

        </Provider>
    );

};

export const useToasts = () => {
    const context = useContext(toastContext);

    return {
        addToast: context.addToast,
        removeToast: context.removeToast,
        toastList: context.toastList
    };
};
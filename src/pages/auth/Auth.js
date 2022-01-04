import { useEffect, useState, useCallback } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import classes from './Auth.module.scss';

//UI Components
import Card from '../../components/UI/Card';
import AuthForm from '../../components/UI/form/customForms/AuthForm';
import LoadingPopover from '../../components/UI/popover/LoadingPopover';
import Popover from '../../components/UI/popover/Popover';
import { useToasts } from '../../components/UI/Toast/ToastProvider';
//Form Configs
import signupFormConfig from '../../components/UI/form/customForms/formConfigs/signupFormConfig';
import signinFormConfig from '../../components/UI/form/customForms/formConfigs/signinFormConfig';
import forgotPasswordFormConfig from '../../components/UI/form/customForms/formConfigs/forgotPasswordForm';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, signinUser, sendResetPasswordEmail } from '../../store/auth-slice';
import { authActions, authSelector } from '../../store/auth-slice';


const Auth = props => {

    const dispatch = useDispatch();
    const { isAuthenticated, isFetching, isSuccess, isError, errorMessage } = useSelector(authSelector);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const modeParam = params.get('mode') ?? 'sigin';
    const { from } = location.state || { from: { pathname: '/' } };

    const [mode, setMode] = useState(modeParam);

    const { addToast } = useToasts();

    useEffect(() => {
        if (isError) {
            addToast({ type: 'error', text: errorMessage, autoDismiss: true, autoDismissTimeout: 10000 });
        }
    }, [isError, errorMessage, addToast]);

    useEffect(() => {
        authActions.clearFetchState();
        return () => dispatch(authActions.clearFetchState());
    }, [dispatch]);

    useEffect(() => {
        setMode(modeParam);
    }, [modeParam]);

    const signupFormHandler = useCallback((values) => {

        dispatch(authActions.clearState());

        const signupData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password
        };

        dispatch(signupUser(signupData));
    }, [dispatch]);

    const signinFormHandler = useCallback((values) => {
        dispatch(authActions.clearState());

        const signinData = {
            email: values.email,
            password: values.password
        };

        dispatch(signinUser(signinData));
    }, [dispatch]);

    const forgotPasswordHandler = useCallback((values) => {
        dispatch(sendResetPasswordEmail(values.email));
    }, [dispatch]);

    const popoverAlertDismissHandler = () => {
        dispatch(authActions.clearState());
    };

    const setupAuthForm = useCallback(() => {
        switch (mode) {
            case 'signin':
                return <AuthForm formConfig={signinFormConfig} submitHandler={signinFormHandler} linkButtonClicked={() => setMode('signup')} />;
            case 'signup':
                return <AuthForm formConfig={signupFormConfig} submitHandler={signupFormHandler} linkButtonClicked={() => setMode('signin')} />;
            case 'forgotPassword':
                return <AuthForm formConfig={forgotPasswordFormConfig} submitHandler={forgotPasswordHandler} linkButtonClicked={() => setMode('signin')} />;
            default:
                return <AuthForm formConfig={signinFormConfig} submitHandler={signinFormHandler} linkButtonClicked={() => setMode('signup')} />;
        }
    }, [mode, forgotPasswordHandler, signinFormHandler, signupFormHandler]);

    return (
        <>
            {isAuthenticated ? <Redirect to={from.pathname} /> : null}
            <div className={classes.auth}>
                <Card>
                    {setupAuthForm()}
                    {mode !== 'forgotPassword' && <div className={classes.auth__forgotPasswordBox}>
                        <button className={classes.auth__forgotPasswordLink} onClick={() => setMode('forgotPassword')}>Forgot your password?</button>
                    </div>}
                    {mode === 'forgotPassword' && <div className={classes.auth__forgotPasswordBox}>
                        <button className={classes.auth__forgotPasswordLink} onClick={() => setMode('signin')}>Sign in</button>
                    </div>}
                </Card>
            </div>
            <LoadingPopover isLoading={isFetching} />
            {isSuccess && mode === 'signup' ? (<Popover title='Success' clicked={popoverAlertDismissHandler}>
                Please check the confirmation message sent to your email
            </Popover>) : null}
            {isSuccess && mode === 'forgotPassword' ? (<Popover title='Success' clicked={popoverAlertDismissHandler}>
                Please check your email for instructions to reset your password
            </Popover>) : null}
        </>
    );
};

export default Auth;
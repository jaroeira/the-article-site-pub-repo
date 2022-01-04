import classes from './ResetPassword.module.scss';

import Card from '../../components/UI/Card';
import Loading from '../../components/UI/Loading';
import Error from '../../components/UI/Error';

import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';

import { useFormik } from 'formik';
import FormBuilder from '../../components/UI/form/FormBuilder';
import resetPasswordForm from '../../components/UI/form/customForms/formConfigs/resetPasswordForm';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { authSelector, authActions, resetPassword } from '../../store/auth-slice';

const ResetPassword = props => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    const dispatch = useDispatch();
    const { isFetching, isError, isSuccess, errorMessage } = useSelector(authSelector);

    const {
        title,
        formInputs,
        initialValues,
        validationSchema,
        linkButton,
        buttonsContainer,
        submitButton
    } = resetPasswordForm;

    const submitHandler = (values) => {
        dispatch(resetPassword({ token, password: values.password }));
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: submitHandler,
        validationSchema: validationSchema
    });

    useEffect(() => {
        dispatch(authActions.clearFetchState());
        return () => dispatch(authActions.clearFetchState());
    }, [dispatch]);

    const form = (
        <Card>
            <h2 className={`heading-2 ${classes.resetPassword__title}`}>{title}</h2>
            <div>
                <FormBuilder
                    formik={formik}
                    formInputs={formInputs}
                    buttonsContainer={buttonsContainer}
                    submitButton={submitButton}
                    linkButton={linkButton}
                />
            </div>
        </Card>
    );

    const success = (
        <Card>
            <div className={classes['resetPassword__success-container']}>
                <h2 className={`heading-2 ${classes.resetPassword__title} `}>Success</h2>
                <p className={classes['resetPassword__success-text']}>The password has been successfully reset</p>
                <Link to='/auth?mode=signin' className={`btn btn--blue`}>Go to Sign In</Link>
            </div>
        </Card>
    );

    const buildState = () => {
        if (isFetching) {
            return <Loading />;
        } else if (!isFetching && !isSuccess && !isError) {
            return form;
        } else if (!isFetching && isSuccess && !isError) {
            return success;
        } else if (!isFetching && isError && errorMessage) {
            return <Error message={errorMessage} />
        } else if (!isFetching && isError && (!errorMessage || errorMessage === '')) {
            return <Error message='Unknown error' />;
        }

        return <Loading />;
    };

    return (
        <section className={classes.resetPassword}>
            {buildState()}
        </section>
    );
};

export default ResetPassword;
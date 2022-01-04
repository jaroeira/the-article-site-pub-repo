import classes from './CreateUser.module.scss';
import createUserFormConfig from '../../components/UI/form/customForms/formConfigs/createUserFormConfig';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

//UI
import Loading from '../../components/UI/Loading';
import FormBuilder from '../../components/UI/form/FormBuilder';
import { useToasts } from '../../components/UI/Toast/ToastProvider';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, adminSelector, createUser } from '../../store/admin-slice';
import { authSelector } from '../../store/auth-slice';

const CreateUser = props => {

    const history = useHistory();
    const { addToast } = useToasts();
    const dispatch = useDispatch();

    const { token } = useSelector(authSelector);

    const { isError, errorMessage, isSuccess, isCreatingUser, didCreateUser } = useSelector(adminSelector);

    const {
        title,
        formInputs,
        initialValues,
        validationSchema,
        linkButton,
        buttonsContainer,
        submitButton
    } = createUserFormConfig;

    const submitHandler = values => {

        const userData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            role: values.role,
            isVerified: true,
            password: values.password
        };

        dispatch(createUser({ token, userData }));
    };

    useEffect(() => {
        dispatch(adminActions.clearFetchState());

        return () => dispatch(adminActions.clearFetchState());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            addToast({ type: 'error', text: errorMessage, autoDismiss: true, autoDismissTimeout: 5000 });
        }
    }, [isError, addToast, errorMessage]);

    useEffect(() => {

        if (isSuccess && didCreateUser) {
            addToast({ type: 'success', text: 'User successfully created', autoDismiss: true, autoDismissTimeout: 5000 });
            history.push('/admin');
        }

    }, [addToast, didCreateUser, isSuccess, history]);


    return (
        <>
            {isCreatingUser && <Loading />}
            {!isCreatingUser &&
                <div className={classes.createUser}>
                    <h1 className={classes.createUser__title}>{title}</h1>
                    <FormBuilder
                        formInputs={formInputs}
                        linkButton={linkButton}
                        buttonsContainer={buttonsContainer}
                        submitButton={submitButton}
                        validationSchema={validationSchema}
                        initialValues={initialValues}
                        onSubmit={submitHandler}
                    />
                </div>}
        </>
    );
};

export default CreateUser;
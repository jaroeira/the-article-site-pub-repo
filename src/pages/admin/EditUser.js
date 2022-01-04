import classes from './EditUser.module.scss';
import { useEffect } from 'react';
import editUserFormConfig from '../../components/UI/form/customForms/formConfigs/editUserFormConfig';
import FormBuilder from '../../components/UI/form/FormBuilder';
import { useParams, useHistory } from 'react-router-dom';

//UI
import Loading from '../../components/UI/Loading';
import { useToasts } from '../../components/UI/Toast/ToastProvider';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, adminSelector, getUser, updateUser } from '../../store/admin-slice';
import { authSelector } from '../../store/auth-slice';

const EditUser = props => {

    const history = useHistory();
    const { addToast } = useToasts();

    const { id } = useParams();

    const { token } = useSelector(authSelector);
    const { isFetchingEditUser, isError, errorMessage, editUser, didUpdateUser, isSuccess } = useSelector(adminSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(adminActions.clearFetchState());

        dispatch(getUser({ token, userId: id }));

        return () => adminActions.clearFetchState();
    }, [dispatch, token, id]);

    useEffect(() => {
        if (isError) {
            addToast({ type: 'error', text: errorMessage, autoDismiss: true, autoDismissTimeout: 5000 });
        }
    }, [isError, addToast, errorMessage]);

    useEffect(() => {

        if (didUpdateUser && isSuccess) {
            addToast({ type: 'success', text: 'User successfully updated', autoDismiss: true, autoDismissTimeout: 5000 });
            history.push('/admin');
        }

    }, [didUpdateUser, addToast, isSuccess, history]);

    const {
        title,
        formInputs,
        validationSchema,
        linkButton,
        buttonsContainer,
        submitButton
    } = editUserFormConfig;

    const submitHandler = values => {
        const userData = {
            userId: values.id,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            role: values.role,
            isVerified: values.emailVerified
        };

        dispatch(updateUser({ token, userData }));
    };

    return (
        <>
            {isFetchingEditUser && <Loading />}
            {!isFetchingEditUser &&
                <div className={classes.editUser}>
                    <h1 className={classes.editUser__title}>{title}</h1>
                    <FormBuilder
                        formInputs={formInputs}
                        linkButton={linkButton}
                        buttonsContainer={buttonsContainer}
                        submitButton={submitButton}
                        validationSchema={validationSchema}
                        initialValues={editUser}
                        onSubmit={submitHandler}
                    />
                </div>
            }
        </>
    );
};

export default EditUser;
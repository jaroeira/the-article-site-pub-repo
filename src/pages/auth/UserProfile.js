import classes from './UserProfile.module.scss';
import sprite from '../../assets/sprite.svg';
import { useState, useEffect } from 'react';

//Form
import FormBuilder from '../../components/UI/form/FormBuilder';
import userPfofileFormConfig from '../../components/UI/form/customForms/formConfigs/userProfileFormConfig';
import userPfofileChangePasswordFormConfig from '../../components/UI/form/customForms/formConfigs/userProfileChangePassword';

//UI
import AvatarImage from '../../components/UI/AvatarImage';
import AvatarPhotoPicker from '../../components/AvatarPhotoPicker/AvatarPhotoPicker';
import { useToasts } from '../../components/UI/Toast/ToastProvider';
import LoadingPopover from '../../components/UI/popover/LoadingPopover';
import Modal from '../../components/UI/Modal/Modal';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, uploadAvatarImage, getUserProfile, updateUserProfile, changeUserPassword, authActions } from '../../store/auth-slice';

const UserProfile = props => {

    //Form config
    const {
        title,
        formInputs,
        validationSchema,
        linkButton,
        buttonsContainer,
        submitButton
    } = userPfofileFormConfig;

    const { addToast } = useToasts();

    //Modal open state
    const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);
    const [isChangePWModalOpen, setIsChangePWModalOpen] = useState(false);

    //Redux selectors
    const dispatch = useDispatch();
    const {
        token,
        userId,
        avatarImageUrl,
        isFetching,
        isError,
        errorMessage,
        userProfile,
        didUpdateUserProfile,
        didChangeUserPassword,
        isSuccess } = useSelector(authSelector);

    //On Page Load
    useEffect(() => {

        dispatch(authActions.clearFetchState());

        dispatch(getUserProfile({ token, userId }));

        return () => dispatch(authActions.clearFetchState());

    }, [dispatch, token, userId]);

    //On error
    useEffect(() => {

        if (isError) {
            addToast({ type: 'error', text: errorMessage, autoDismiss: true, autoDismissTimeout: 5000 });
        }

    }, [isError, addToast, errorMessage]);

    //On update success
    useEffect(() => {

        if (isSuccess && didUpdateUserProfile) {
            addToast({ type: 'success', text: 'User Profile successfully updated', autoDismiss: true, autoDismissTimeout: 3000 });
            dispatch(authActions.clearFetchState());
        }

    }, [didUpdateUserProfile, isSuccess, addToast, dispatch]);

    //Avatar Photo change handlers

    const avatarPhotoPickerCancelHandler = () => {
        setIsPhotoPickerOpen(false);
    };

    const changePhotoClickHandler = () => {
        setIsPhotoPickerOpen(true);
    };

    const photoPickerSaveHandler = (imageFile) => {

        setIsPhotoPickerOpen(false);

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('userId', userId);

        dispatch(uploadAvatarImage({ token, formData }));

    };

    const submitHandler = (values) => {
        const userData = {
            userId: userId,
            firstName: values.firstName,
            lastName: values.lastName
        };

        dispatch(updateUserProfile({ token, userData }));

    };

    //Avatar Photo change handlers - End

    //Change user Password

    //on change password success
    useEffect(() => {

        if (isSuccess && didChangeUserPassword) {
            addToast({ type: 'success', text: 'Password successfully changed', autoDismiss: true, autoDismissTimeout: 3000 });
            dispatch(authActions.clearFetchState());
        }

    }, [addToast, isSuccess, didChangeUserPassword, dispatch]);

    const changePasswordSubmitHandler = (values) => {

        setIsChangePWModalOpen(false);

        const userData = {
            userId: userId,
            password: values.currentPassword,
            newPassword: values.newPassword
        };

        dispatch(changeUserPassword({ token, userData }));

    };

    return (
        <div className={classes.userProfile}>
            <div className={classes['userProfile__photo-container']}>
                <div className={classes['userProfile__photo-card']}>
                    <AvatarImage size='lg' imageUrl={avatarImageUrl} text={userProfile?.displayName} />
                    <button type='button' className={classes['userProfile__change-photo']} onClick={changePhotoClickHandler}>
                        Change Photo
                        <svg className={classes['userProfile__change-photo-icon']}>
                            <use href={sprite + '#icon-camera'}></use>
                        </svg>
                    </button>
                    <button type='button' className={`btn ${classes['userProfile__change-password-button']}`} onClick={() => setIsChangePWModalOpen(true)}>
                        Change Password
                    </button>
                </div>
            </div>
            <div className={classes['userProfile__info-container']}>
                <div className={classes['userProfile__user-info-card']}>
                    <div className={classes['userProfile__user-info-card-title']}>
                        {title}
                    </div>
                    {userProfile !== null &&
                        <FormBuilder
                            formInputs={formInputs}
                            linkButton={linkButton}
                            buttonsContainer={buttonsContainer}
                            submitButton={submitButton}
                            validationSchema={validationSchema}
                            onSubmit={submitHandler}
                            initialValues={
                                {
                                    firstName: userProfile?.firstName ?? '',
                                    lastName: userProfile?.lastName ?? '',
                                    email: userProfile?.email ?? ''
                                }
                            }

                        />
                    }
                </div>
            </div>
            <LoadingPopover isLoading={isFetching} loadingText='Loading' />
            <AvatarPhotoPicker
                isOpen={isPhotoPickerOpen}
                onCancel={avatarPhotoPickerCancelHandler}
                saveImageHandler={photoPickerSaveHandler}
            />
            <Modal isOpen={isChangePWModalOpen} onClose={() => setIsChangePWModalOpen(false)} title='Change Password' hideFooter={true}>
                <FormBuilder
                    formInputs={userPfofileChangePasswordFormConfig.formInputs}
                    linkButton={userPfofileChangePasswordFormConfig.linkButton}
                    buttonsContainer={userPfofileChangePasswordFormConfig.buttonsContainer}
                    submitButton={userPfofileChangePasswordFormConfig.submitButton}
                    validationSchema={userPfofileChangePasswordFormConfig.validationSchema}
                    onSubmit={changePasswordSubmitHandler}
                    initialValues={userPfofileChangePasswordFormConfig.initialValues}

                />
            </Modal>
        </div>
    );

};

export default UserProfile;
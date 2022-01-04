import * as yup from 'yup';

const userProfileChangePasswordSchema = yup.object({
    currentPassword: yup.string().required('Required'),
    newPassword: yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    confirmPassword: yup.string().required('Please confirm password')
        .when('newPassword', {
            is: newPassword => (newPassword && newPassword.length > 0 ? true : false),
            then: yup.string().oneOf([yup.ref('newPassword')], 'Password doesn\'t match')
        })
});

const userPfofileChangePasswordFormConfig = {
    title: 'Change Password',
    formInputs: [
        {
            type: 'password',
            field: 'currentPassword',
            label: 'Password',
            style: { 'gridColumn': '1 / -1' }
        },
        {
            type: 'password',
            field: 'newPassword',
            label: 'New Password',
            style: { 'gridColumn': '1 / -1' }
        },
        {
            type: 'password',
            field: 'confirmPassword',
            label: 'Confirm password',
            style: { 'gridColumn': '1 / -1' }
        }
    ],
    initialValues: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    },
    buttonsContainer: {
        style: {}
    },
    linkButton: {
        show: false,
        label: 'back',
        to: '/',
        style: {}
    },
    submitButton: {
        label: 'Change Password',
        style: { paddingRight: '4rem', paddingLeft: '4rem' }
    },
    validationSchema: userProfileChangePasswordSchema
};

export default userPfofileChangePasswordFormConfig;
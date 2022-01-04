import * as yup from 'yup';

const changePasswordSchema = yup.object({
    newPassword: yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    confirmPassword: yup.string().required('Please confirm password')
        .when('password', {
            is: password => (password && password.length > 0 ? true : false),
            then: yup.string().oneOf([yup.ref('password')], 'Password doesn\'t match')
        })
});

const changePasswordFormConfig = {
    title: 'Change Password',
    formInputs: [
        {
            type: 'text',
            field: 'firstName',
            label: 'First name',
            style: { 'gridColumn': '1 / 2' },
            readOnly: true
        },
        {
            type: 'text',
            field: 'lastName',
            label: 'Last name',
            style: { 'gridColumn': '2 / -1' },
            readOnly: true
        },
        {
            type: 'email',
            field: 'email',
            label: 'Email',
            style: { 'gridColumn': '1 / -1' },
            readOnly: true
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
        firstName: '',
        lastName: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
    },
    buttonsContainer: {
        style: {}
    },
    linkButton: {
        show: true,
        label: 'back',
        to: '/admin',
        style: {}
    },
    submitButton: {
        label: 'Change Password',
        style: { paddingRight: '4rem', paddingLeft: '4rem' }
    },
    validationSchema: changePasswordSchema
};

export default changePasswordFormConfig;
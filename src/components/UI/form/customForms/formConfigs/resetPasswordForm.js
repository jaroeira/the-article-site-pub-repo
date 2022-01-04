import * as yup from 'yup';

const resetPasswordSchema = yup.object({
    password: yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    confirmPassword: yup.string().required('Please confirm password')
        .when('password', {
            is: password => (password && password.length > 0 ? true : false),
            then: yup.string().oneOf([yup.ref('password')], 'Password doesn\'t match')
        })
});

const resetPasswordFormConfig = {
    title: 'Reset Password',
    formInputs: [
        {
            type: 'password',
            field: 'password',
            label: 'Password',
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
        password: '',
        confirmPassword: ''
    },
    buttonsContainer: {
        style: {}
    },
    linkButton: {
        show: false,
        label: '',
        to: '',
        style: {}
    },
    submitButton: {
        label: 'Reset Password',
        style: { paddingRight: '4rem', paddingLeft: '4rem', margin: '0 auto' }
    },
    validationSchema: resetPasswordSchema
};

export default resetPasswordFormConfig;
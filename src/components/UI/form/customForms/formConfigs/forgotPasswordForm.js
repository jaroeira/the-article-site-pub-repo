import * as yup from 'yup';

const forgotPasswordlSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Required')
});

const forgotPasswordConfig = {
    title: 'Forgot Password',
    formInputs: [
        {
            type: 'email',
            field: 'email',
            label: 'Email',
            style: { 'gridColumn': '1 / -1' }
        }
    ],
    initialValues: {
        email: ''
    },
    buttonsContainer: {
        style: {
            justifyContent: 'center'
        }
    },
    linkButton: {
        show: false,
        label: 'Sign in insted',
        to: '/auth?mode=sigin',
        style: {}
    },
    submitButton: {
        label: 'Send email',
        style: { paddingRight: '4rem', paddingLeft: '4rem' }
    },
    validationSchema: forgotPasswordlSchema
};

export default forgotPasswordConfig;
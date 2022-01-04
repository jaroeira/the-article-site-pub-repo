import * as yup from 'yup';

const signinSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Required'),
    password: yup.string().required('Required')
});

const signinFormConfig = {
    title: 'Sign In',
    formInputs: [
        {
            type: 'email',
            field: 'email',
            label: 'Email',
            style: { 'gridColumn': '1 / -1' }
        },
        {
            type: 'password',
            field: 'password',
            label: 'Password',
            style: { 'gridColumn': '1 / -1' }
        }
    ],
    initialValues: {
        email: '',
        password: ''
    },
    buttonsContainer: {
        style: {}
    },
    linkButton: {
        show: true,
        label: 'Sign up insted',
        to: '/auth?mode=signup',
        style: {}
    },
    submitButton: {
        label: 'Sign in',
        style: { paddingRight: '4rem', paddingLeft: '4rem' }
    },
    validationSchema: signinSchema
};

export default signinFormConfig;
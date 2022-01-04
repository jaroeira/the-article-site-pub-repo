import * as yup from 'yup';

const createUserSchema = yup.object({
    firstName: yup.string().max(15, 'Must be 15 characters or less').required('Required'),
    lastName: yup.string().max(15, 'Must be 15 characters or less').required('Required'),
    email: yup.string().email('Invalid email address').required('Required'),
    password: yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    confirmPassword: yup.string().required('Please confirm password')
        .when('password', {
            is: password => (password && password.length > 0 ? true : false),
            then: yup.string().oneOf([yup.ref('password')], 'Password doesn\'t match')
        })
});

const createUserFormConfig = {
    title: 'Create User',
    formInputs: [
        {
            type: 'text',
            field: 'firstName',
            label: 'First name',
            style: { 'gridColumn': '1 / 2' }
        },
        {
            type: 'text',
            field: 'lastName',
            label: 'Last name',
            style: { 'gridColumn': '2 / -1' }
        },
        {
            type: 'email',
            field: 'email',
            label: 'Email',
            style: { 'gridColumn': '1 / -1' }
        },
        {
            type: 'select',
            selectOptions: [
                { label: 'User', value: 'User' },
                { label: 'Editor', value: 'Editor' },
                { label: 'Admin', value: 'Admin' }
            ],
            field: 'role',
            label: 'Role',
            style: { 'gridColumn': '1 / -1' }
        },
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
        firstName: '',
        lastName: '',
        email: '',
        role: 'User',
        password: '',
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
        label: 'Create User',
        style: { paddingRight: '4rem', paddingLeft: '4rem' }
    },
    validationSchema: createUserSchema
};

export default createUserFormConfig;
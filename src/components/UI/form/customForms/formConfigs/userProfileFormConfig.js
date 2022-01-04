import * as yup from 'yup';

const userPfofileSchema = yup.object({
    firstName: yup.string().max(15, 'Must be 15 characters or less').required('Required'),
    lastName: yup.string().max(15, 'Must be 15 characters or less').required('Required'),
});

const userPfofileFormConfig = {
    title: 'User Profile',
    formInputs: [
        {
            type: 'text',
            field: 'firstName',
            label: 'First name',
            style: { 'gridColumn': '1 / -1' }
        },
        {
            type: 'text',
            field: 'lastName',
            label: 'Last name',
            style: { 'gridColumn': '1 / -1' }
        },
        {
            type: 'email',
            field: 'email',
            label: 'Email',
            style: { 'gridColumn': '1 / -1' },
            readOnly: true
        }
    ],
    initialValues: {
        firstName: '',
        lastName: ''
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
        label: 'Save Changes',
        style: { paddingRight: '4rem', paddingLeft: '4rem' }
    },
    validationSchema: userPfofileSchema
};

export default userPfofileFormConfig;
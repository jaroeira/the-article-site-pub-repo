import * as yup from 'yup';

const editUserSchema = yup.object({
    firstName: yup.string().max(15, 'Must be 15 characters or less').required('Required'),
    lastName: yup.string().max(15, 'Must be 15 characters or less').required('Required'),
});

const editUserFormConfig = {
    title: 'Edit User',
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
            style: { 'gridColumn': '1 / -1' },
            readOnly: true
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
            type: 'select',
            selectOptions: [
                { label: 'No', value: false },
                { label: 'Yes', value: true },
            ],
            field: 'emailVerified',
            label: 'Is verified',
            style: { 'gridColumn': '1 / -1' }
        }
    ],
    initialValues: {
        firstName: '',
        lastName: '',
        role: 'User',
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
        label: 'Save Changes',
        style: { paddingRight: '4rem', paddingLeft: '4rem' }
    },
    validationSchema: editUserSchema
};

export default editUserFormConfig;
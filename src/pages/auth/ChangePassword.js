import classes from './ChangePassword.module.scss';
import adminChangePassFormConfig from '../../components/UI/form/customForms/formConfigs/adminChangePassFormConfig';
import FormBuilder from '../../components/UI/form/FormBuilder';

const ChangePassword = props => {

    const testData = {
        firstName: 'Max',
        lastName: 'Golden',
        email: 'j.aroeira@gmail.com',
    };

    const {
        title,
        formInputs,
        validationSchema,
        linkButton,
        buttonsContainer,
        submitButton
    } = adminChangePassFormConfig;

    const submitHandler = values => {
        console.log(values);
    };

    return (
        <div className={classes.changePassword}>
            <h1 className={classes.changePassword__title}>{title}</h1>
            <FormBuilder
                formInputs={formInputs}
                linkButton={linkButton}
                buttonsContainer={buttonsContainer}
                submitButton={submitButton}
                validationSchema={validationSchema}
                initialValues={testData}
                onSubmit={submitHandler}
            />
        </div>
    );
};

export default ChangePassword;
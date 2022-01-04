import classes from './AuthForm.module.scss';
import { Fragment } from 'react';

import FormBuilder from '../FormBuilder';

const AuthForm = props => {

    const formConfig = props.formConfig;

    const {
        title,
        formInputs,
        initialValues,
        validationSchema,
        linkButton,
        buttonsContainer,
        submitButton
    } = formConfig;

    const submitHandler = values => {
        props.submitHandler(values);
        // resetForm();
    };

    const linkButtonClickHandler = (resetForm) => {

        resetForm();
        if (props.linkButtonClicked) {
            props.linkButtonClicked();
        }
    };

    return (
        <Fragment>
            <h2 className={`heading-2 ${classes.authForm__title}`}>{title}</h2>
            <div className={classes.authForm__formContainer}>

                <FormBuilder
                    formInputs={formInputs}
                    linkButton={linkButton}
                    buttonsContainer={buttonsContainer}
                    submitButton={submitButton}
                    linkButtonClicked={linkButtonClickHandler}
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={submitHandler}
                />

            </div>

        </Fragment>
    );
};

export default AuthForm;
import classes from './FormBuilder.module.scss';
import FormInputBuilder from './FormInputBuilder';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';


const FormBuilder = props => {

    const {
        formInputs,
        linkButton,
        buttonsContainer,
        submitButton,
        onSubmit,
        initialValues,
        validationSchema,
        linkButtonClicked
    } = props;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {props => (
                <form onSubmit={props.handleSubmit} noValidate>
                    <div className={classes.formBuilder__inputContainer}>
                        <FormInputBuilder formInputs={formInputs} {...props} />
                    </div>
                    <div className={classes['formBuilder__buttons-container']} style={buttonsContainer.style}>

                        {linkButton.show &&
                            <Link
                                className={classes.formBuilder__linkButton}
                                to={linkButton.to}
                                onClick={linkButtonClicked ? () => linkButtonClicked(props.resetForm) : null}
                                style={linkButton.style}>{linkButton.label}</Link>}

                        <button type='submit'
                            className={`btn btn--blue ${classes.formBuilder__button}`}
                            disabled={!props.isValid} style={submitButton.style}>{submitButton.label}</button>
                    </div>
                </form>
            )}

        </Formik>
    );
};

export default FormBuilder;
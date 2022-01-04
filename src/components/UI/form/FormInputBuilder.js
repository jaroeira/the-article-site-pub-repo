import { Fragment } from 'react';
import FormInput from './FormInput';


const FormInputBuilder = ({ formInputs, handleChange, handleBlur, touched, errors, values }) => {

    const builder = inputConfig => {
        switch (inputConfig.type) {
            case 'select':
                return <FormInput key={inputConfig.field}
                    type='select'
                    label={inputConfig.label}
                    name={inputConfig.field}
                    changed={handleChange}
                    blur={handleBlur}
                    touched={touched[inputConfig.field]}
                    errors={errors[inputConfig.field]}
                    style={inputConfig.style}
                    selectOptions={inputConfig.selectOptions}
                    value={values[inputConfig.field] || ''}
                />;
            case 'text':
                return <FormInput key={inputConfig.field}
                    type='text'
                    label={inputConfig.label}
                    name={inputConfig.field}
                    changed={handleChange}
                    blur={handleBlur}
                    touched={touched[inputConfig.field]}
                    errors={errors[inputConfig.field]}
                    style={inputConfig.style}
                    value={values[inputConfig.field] || ''}
                    readOnly={inputConfig?.readOnly ? true : false}
                />;
            case 'email':
                return <FormInput key={inputConfig.field}
                    type='email'
                    label={inputConfig.label}
                    name={inputConfig.field}
                    changed={handleChange}
                    blur={handleBlur}
                    touched={touched[inputConfig.field]}
                    errors={errors[inputConfig.field]}
                    style={inputConfig.style}
                    value={values[inputConfig.field] || ''}
                    readOnly={inputConfig?.readOnly ? true : false}
                />;
            case 'password':
                return <FormInput key={inputConfig.field}
                    type='password'
                    label={inputConfig.label}
                    name={inputConfig.field}
                    changed={handleChange}
                    blur={handleBlur}
                    touched={touched[inputConfig.field]}
                    errors={errors[inputConfig.field]}
                    style={inputConfig.style}
                    value={values[inputConfig.field] || ''}
                    readOnly={inputConfig?.readOnly ? true : false}
                />;
            default:
                return <div key={Date.now.toString()}>Unsuported Field</div>;
        }
    };

    return (
        <Fragment>
            {formInputs.map(inputConfig => {
                return builder(inputConfig);
            })}
        </Fragment>
    );

};

export default FormInputBuilder;
import classes from './FormInput.module.scss';

const FormInput = props => {

    const {
        type,
        label,
        name,
        changed,
        blur,
        touched,
        errors,
        style,
        maxLength,
        rows,
        selectOptions,
        readOnly,
        value
    } = props;

    const htmlInput = (

        <input type={type} className={classes.formInput__input}
            id={name}
            name={name}
            placeholder={label}
            onChange={changed}
            onBlur={blur}
            value={value}
            readOnly={readOnly}
        ></input>
    );

    const htmlTextArea = (
        <textarea
            className={`${classes.formInput__input} ${classes.formInput__textarea}`}
            id={name}
            name={name}
            placeholder={label}
            onChange={changed}
            onBlur={blur}
            maxLength={maxLength}
            value={value}
            rows={rows}
        ></textarea>
    );

    const htmlSelect = (
        <div className={classes.formInput__select}>
            <select id={name} name={name} onChange={changed} value={value}>
                {selectOptions?.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className={classes.formInput} style={style}>
            {(type === 'text' || type === 'email' || type === 'password') && htmlInput}
            {type === 'textarea' && htmlTextArea}
            {type === 'select' && htmlSelect}
            <label className={classes.formInput__label} style={type === 'select' ? { transform: 'translateY(-5.2rem)' } : {}}>{label}</label>
            {touched && errors && <div className={classes.formInput__error}>{errors}</div>}
        </div>
    );
};

export default FormInput;
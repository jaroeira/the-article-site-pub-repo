import classes from './TagInput.module.scss';
import { useState, useEffect } from 'react'
import Tag from './Tag';

const InputTag = props => {

    const { maxTags, placeholder, onChange, value = [] } = props;

    const [tags, setTags] = useState(value);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        setTags(value);
    }, [value]);

    const addTag = (value) => {
        const currentTags = [...tags];
        if (!currentTags.includes(value)) {
            currentTags.push(value);
            setTags(currentTags);
            onChange(currentTags);
        }
    };

    const removeTagHandler = (index) => {
        const currentTags = [...tags];
        currentTags.splice(index, 1);
        setTags(currentTags);

        onChange(currentTags);
    };

    const inputChangeHandler = (e) => {
        setInputValue(e.target.value);
    };

    const validate = (value) => {
        const pattern = /^[a-zA-Z0-9_]+$/;
        const result = pattern.test(value);
        result ? setError(null) : setError('Only letters, numbers and underscore. Spaces are not allowed');
        return result;
    };

    const inputKeyDownHandler = (e) => {



        //if enter was pressed
        if (e.keyCode === 13) {
            //prevent default html submit
            e.preventDefault();

            if (!validate(e.target.value)) {
                setInputValue('');
                return;
            }

            if (e.target.value === '') return;

            addTag(e.target.value.toLowerCase());

            setInputValue('');
        }
    };

    const showInput = maxTags && tags.length < maxTags;

    return (
        <div className={classes.tagInput}>
            {showInput &&
                <div className={classes.tagInput__inputContainer}>
                    <input
                        type='text'
                        className={classes.tagInput__input}
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={inputChangeHandler}
                        onKeyDown={inputKeyDownHandler}
                    />
                    <label className={classes.tagInput__label}>{placeholder}</label>
                </div>}
            {error && <div className={classes.tagInput__error}>{error}</div>}
            <div className={classes.tagInput__tagContainer}>
                {tags.map((tag, i) => <Tag key={i} value={tag} index={i} remove={removeTagHandler} showRemoveButton={true} />)}
            </div>
        </div>
    );
};

export default InputTag;
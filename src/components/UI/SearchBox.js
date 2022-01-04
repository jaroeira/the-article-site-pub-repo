import classes from './SearchBox.module.scss';

import sprite from '../../assets/sprite.svg';

import { useHistory } from "react-router-dom";

//Formik
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

//Redux
import { useDispatch } from 'react-redux';
import { articleActions } from '../../store/article-slice';

const SearchBox = (props) => {

    const dispatch = useDispatch();

    const history = useHistory();

    const submitHandler = (values) => {
        console.log('submitHandler', values);
        dispatch(articleActions.setSearchTerm({ text: values.searchTerm }));
        history.push('/articles/search');
    };

    return (
        <Formik
            initialValues={{ searchTerm: '' }}
            onSubmit={submitHandler}
            validationSchema={yup.object({
                searchTerm: yup.string().max(50, 'Max 50 characters').required('search term can\'t be empty')
            })}
        >
            {({ handleSubmit }) => (
                <>
                    <form className={classes.searchBox} onSubmit={handleSubmit}>
                        {/* <input type='text' className={classes.searchBox__input} placeholder='Search articles' /> */}
                        <Field name='searchTerm' className={classes.searchBox__input} placeholder='Search articles' />
                        <button className={classes.searchBox__button} type='submit'>
                            <svg className={classes.searchBox__icon}>
                                <use href={sprite + '#icon-magnifying-glass'}></use>
                            </svg>
                        </button>
                    </form >
                    <div className={classes.searchBox__error}>
                        <ErrorMessage name='searchTerm' />
                    </div>
                </>
            )}
        </Formik>

    );
};

export default SearchBox;
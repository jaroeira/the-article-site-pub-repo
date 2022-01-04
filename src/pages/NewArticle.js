import classes from './NewArticle.module.scss';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { createArticle, articleActions, articleSelector, getArticleById, updateArticle } from '../store/article-slice';
import { authSelector } from '../store/auth-slice';

//UI Components
import FormInput from '../components/UI/form/FormInput';
import TagInput from '../components/UI/TagInput/TagInput';
import LoadingPopover from '../components/UI/popover/LoadingPopover';
import Error from '../components/UI/Error';
import { useToasts } from '../components/UI/Toast/ToastProvider';

//Formik
import { Formik } from 'formik';
import * as yup from 'yup';

//Services
import articleService from '../services/articleService';

//Helpers
import imageCompressor from '../helpers/imageCompressor';

//ReactQuill related
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import ImageUploader from "quill-image-uploader";
import htmlParser from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';


Quill.register('modules/imageResize', ImageResize);
Quill.register("modules/imageUploader", ImageUploader);



const NewArticle = props => {

    //Edit mode id param
    const { id } = useParams();

    const dispatch = useDispatch();
    const { token } = useSelector(authSelector);
    const { newArticleId, isFetching, isError, isSuccess, errorMessage, articleDetail, didUpdateArticle } = useSelector(articleSelector);

    const [content, setContent] = useState('');
    const [uploadedImageNames, setUploadedImageNames] = useState([]);

    const { addToast } = useToasts();
    const history = useHistory();

    //On Error
    useEffect(() => {
        if (isError) {
            addToast({ type: 'error', text: errorMessage, autoDismiss: true, autoDismissTimeout: 5000 });
        }
    }, [isError, addToast, errorMessage]);

    //On update success
    useEffect(() => {
        if (didUpdateArticle) {
            addToast({ type: 'success', text: 'Article successfully updated', autoDismiss: true, autoDismissTimeout: 5000 });
            history.replace(`/article/${id}`);
        }
    }, [isSuccess, addToast, didUpdateArticle, id, history]);

    //On create success
    useEffect(() => {
        if (isSuccess && newArticleId) {
            addToast({ type: 'success', text: 'Article successfully created', autoDismiss: true, autoDismissTimeout: 5000 });
            history.replace(`/article/${newArticleId}`);
        }
    }, [isSuccess, addToast, history, newArticleId]);


    //On first load
    useEffect(() => {
        articleActions.clearFetchState();
        return () => dispatch(articleActions.clearFetchState());
    }, [dispatch]);

    //On Edit mode
    useEffect(() => {
        if (id) {

            if (!articleDetail?.id) {
                dispatch(getArticleById({ articleId: id }));
            }

            setContent(articleDetail?.content ?? '');

            console.log('edit mode');

        }
    }, [id, articleDetail, dispatch]);


    const submitHandler = (values) => {


        if (id) { //Edit existin Article
            const updateData = {
                articleId: id,
                title: values.title,
                description: values.description,
                content: content,
                tags: values.tags,
                uploadedImageNames,
                token: token
            }

            dispatch(updateArticle({ token, formData: updateData }));

        } else { //Create New Article
            dispatch(createArticle({
                title: values.title,
                description: values.description,
                content: content,
                tags: values.tags,
                uploadedImageNames,
                token: token
            }));
        }


    };

    const imageUploadHandler = useCallback((file) => {
        return new Promise(async (resolve, reject) => {
            const compressedImage = await imageCompressor(file);

            const formData = new FormData();
            formData.append('image', compressedImage);
            const response = await articleService.uploadImage({ formData: formData, token });
            setUploadedImageNames(prevState => [...prevState, response.fileName]);
            resolve(response.imageUrl);
        });
    }, [token]);

    const modules = {
        imageUploader: { upload: imageUploadHandler },
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize', 'Toolbar']
        },
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ]
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'imageBlot'
    ];

    return (
        <>
            <LoadingPopover isLoading={isFetching && !isError} loadingText='Loading...' />
            {isError && <Error message={errorMessage} />}
            {!isError && <Formik
                enableReinitialize
                initialValues={id && articleDetail ? {
                    title: articleDetail.title,
                    description: articleDetail.description,
                    tags: articleDetail.tags
                } :
                    {
                        title: '',
                        description: '',
                        tags: []
                    }}
                validationSchema={yup.object({
                    title: yup.string().required('Required'),
                    description: yup.string().min(100, 'Min 100 characters').max(240, 'Max 240 Characters').required('Required')
                })}
                onSubmit={submitHandler}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isValid, setFieldValue }) => (
                    <section className={classes.newArticle}>
                        <h2 className={`heading-2 ${classes.newArticle__title}`}>{id ? 'Edit Article' : 'Add new Article'}</h2>
                        <form onSubmit={handleSubmit}>
                            <FormInput
                                name='title'
                                type='text'
                                label='Article Title'
                                changed={handleChange}
                                blur={handleBlur}
                                touched={touched}
                                errors={errors.title}
                                value={values.title ?? ''}
                            />
                            <FormInput
                                name='description'
                                type='textarea'
                                label='Article Description'
                                changed={handleChange}
                                blur={handleBlur}
                                touched={touched}
                                errors={errors.description}
                                rows='5'
                                maxLength='240'
                                value={values.description ?? ''}
                            />
                            <TagInput
                                maxTags='10'
                                placeholder='Type hashtag and press enter'
                                onChange={(values) => {
                                    console.log('setFieldValue', values);
                                    setFieldValue('tags', values);
                                }}
                                value={values.tags ?? []}
                            />
                            <div className={classes.newArticle__editor}>
                                <ReactQuill
                                    id='content'
                                    name='content'
                                    className={classes.newArticle__editor}
                                    theme='snow'
                                    onChange={setContent}
                                    modules={modules}
                                    formats={formats}
                                    value={content}
                                />
                            </div>

                            <div className={classes['newArticle__btn-container']}>
                                <button type='submit' disabled={!isValid} className={`btn btn--blue ${classes.newArticle__btn}`}>{id && articleDetail ? 'Save Changes' : 'Create Article'}</button>
                            </div>

                        </form>
                        <div style={{ paddingTop: '10rem', overflow: 'scroll', maxWidth: '100rem' }}>
                            {htmlParser(`${content}`)}
                        </div>
                    </section >
                )}
            </Formik>}


        </>

    );
};

export default NewArticle;
import classes from './AvatarPhotoPicker.module.scss';

//React
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

//UI
import Avatar from 'react-avatar-edit';
import { CSSTransition } from 'react-transition-group';
import Card from '../UI/Card';
import Backdrop from '../UI/Backdrop';

//helpers
import imageCompressor from '../../helpers/imageCompressor';
import urlToFile from '../../helpers/urlToFile';


const avatarPickerRoot = document.getElementById('avatar-picker-root');

const AvatarPhotoPicker = props => {

    const {
        isOpen = false,
        onCancel,
        saveImageHandler
    } = props;

    const [previewPhoto, setPreviewPhoto] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setPreviewPhoto(null);
    }, [isOpen]);

    const onCrop = async (preview) => {
        setPreviewPhoto(preview);
    };

    const onClose = () => {
        setPreviewPhoto(null);
    };

    const onBeforeFileLoad = (el) => {
        if (el.target.files[0].size > 4000000) {
            setErrorMessage('File is too big! ');
            el.target.value = '';
            setIsValid(false);
            setPreviewPhoto(null);
        } else {
            setErrorMessage(null);
            setIsValid(true);
        }
    };

    const onSave = async () => {
        console.log('Save Avatar');
        if (previewPhoto) {
            const imageFile = await urlToFile(previewPhoto, 'avatar.png');
            const compressedImage = await imageCompressor(imageFile);

            if (saveImageHandler) {
                saveImageHandler(compressedImage);
            }
        }
    };

    const nodeRef = useRef(null);
    const previewNodeRef = useRef(null);

    return (
        createPortal(
            <>
                <CSSTransition in={isOpen} nodeRef={nodeRef} timeout={300} mountOnEnter unmountOnExit
                    classNames={{
                        enter: classes['avatarPhotoPicker-enter'],
                        enterActive: classes['avatarPhotoPicker-enter-active'],
                        exit: classes['avatarPhotoPicker-exit'],
                        exitActive: classes['avatarPhotoPicker-exit-active'],
                    }}
                >
                    <div className={classes.avatarPhotoPicker} ref={nodeRef}>
                        <Card>
                            <div className={classes.avatarPhotoPicker__header}>
                                <h4>Photo Picker</h4>
                            </div>
                            <div className={classes.avatarPhotoPicker__picker}>
                                <Avatar
                                    width={200}
                                    height={200}
                                    onCrop={onCrop}
                                    onClose={onClose}
                                    onBeforeFileLoad={onBeforeFileLoad}
                                />
                            </div>

                            {errorMessage &&
                                <div className={classes.avatarPhotoPicker__error}>
                                    <p>{errorMessage}</p>
                                </div>}

                            <CSSTransition in={previewPhoto !== null && isValid} timeout={200} mountOnEnter unmountOnExit nodeRef={previewNodeRef}
                                classNames={{
                                    enter: classes['avatarPhotoPicker__preview-enter'],
                                    enterActive: classes['avatarPhotoPicker__preview-enter-active'],
                                    exit: classes['avatarPhotoPicker__preview-exit'],
                                    exitActive: classes['avatarPhotoPicker__preview-exit-active'],
                                }}
                            >
                                <div className={classes.avatarPhotoPicker__preview} ref={previewNodeRef}>
                                    <h4>Preview</h4>
                                    <img src={previewPhoto} alt='preview' className={classes['avatarPhotoPicker__preview-image']} />
                                </div>
                            </CSSTransition>
                            <div className={classes.avatarPhotoPicker__footer}>
                                <button className={`btn btn--white`} onClick={onCancel}>Cancel</button>
                                <button className={`btn btn--blue`} disabled={!isValid} onClick={onSave}>Save</button>
                            </div>
                        </Card>
                    </div>
                </CSSTransition>
                {isOpen && <Backdrop />}
            </>
            ,
            avatarPickerRoot
        )
    );
};

export default AvatarPhotoPicker;
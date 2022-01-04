import classes from './AvatarImage.module.scss';
import sprite from '../../assets/sprite.svg';

const AvatarImage = props => {

    const { imageUrl, size = 'md', text = 'text' } = props;

    const getStyleForImageSize = (size) => {

        switch (size) {
            case 'sm':
                return `${classes['avatarImage--small']}`;
            case 'md':
                return `${classes['avatarImage--medium']}`;
            case 'lg':
                return `${classes['avatarImage--large']}`;
            default:
                return `${classes['avatarImage--medium']}`;
        }
    };

    const getStyleForContainerSize = (size) => {

        switch (size) {
            case 'sm':
                return `${classes['avatarImage__container--small']}`;
            case 'md':
                return `${classes['avatarImage__container--medium']}`;
            case 'lg':
                return `${classes['avatarImage__container--large']}`;
            default:
                return `${classes['avatarImage__container--medium']}`;
        }
    };

    const getStyleForIcomSize = (size) => {
        switch (size) {
            case 'sm':
                return `${classes['avatarImage__icon--small']}`;
            case 'md':
                return `${classes['avatarImage__icon--medium']}`;
            case 'lg':
                return `${classes['avatarImage__icon--large']}`;
            default:
                return `${classes['avatarImage__icon--medium']}`;
        }
    };

    const getStyleForUserNameSize = (size) => {
        switch (size) {
            case 'sm':
                return `${classes['avatarImage__user-name--small']}`;
            case 'md':
                return `${classes['avatarImage__user-name--medium']}`;
            case 'lg':
                return `${classes['avatarImage__user-name--large']}`;
            default:
                return `${classes['avatarImage__user-name--medium']}`;
        }
    };

    const getStyleForPhotoSize = (size) => {
        switch (size) {
            case 'sm':
                return `${classes['avatarImage__photo--small']}`;
            case 'md':
                return `${classes['avatarImage__photo--medium']}`;
            case 'lg':
                return `${classes['avatarImage__photo--large']}`;
            default:
                return `${classes['avatarImage__photo--medium']}`;
        }
    };

    return (
        <div className={`${classes.avatarImage} ${getStyleForImageSize(size)}`}>

            <div className={`${classes['avatarImage__container']} ${getStyleForContainerSize(size)}`}>

                {imageUrl &&
                    <img src={imageUrl} alt='user' className={`${getStyleForPhotoSize(size)}`} />
                }

                {!imageUrl &&
                    <svg className={`${classes['avatarImage__icon']} ${getStyleForIcomSize(size)}`}>
                        <use href={sprite + '#icon-user'}></use>
                    </svg>
                }

            </div>
            <h4 className={`${classes['avatarImage__user-name']} ${getStyleForUserNameSize(size)}`}>{text}</h4>
        </div>
    );

};

export default AvatarImage;
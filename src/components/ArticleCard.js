import Card from './UI/Card';
import classes from './ArticleCard.module.scss';
import { Link } from 'react-router-dom';
import AvatarImage from './UI/AvatarImage';
import sprite from '../assets/sprite.svg';

const ArticleCard = props => {

    const { id, creator, title, description, created, likes } = props.article;

    const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const formatedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(created));

    return (
        <Card >
            <div className={classes.articleCard}>
                <AvatarImage size='sm' imageUrl={creator.avatarImage.imageUrl} text={creator.displayName} className={classes.articleCard__author} />
                <h2 className={classes.articleCard__title}>{title}</h2>
                <div className={classes.articleCard__description}>
                    {description}
                </div>
                <div className={classes.articleCard__likes}>
                    <svg className={classes['articleCard__likes-icon']}>
                        <use href={sprite + '#icon-heart'}></use>
                    </svg>
                    <p className={classes['articleCard__likes-value']}>{likes}</p>
                </div>
                <span className={classes.articleCard__date}>{formatedDate}</span>
                <Link to={`/article/${id}`} className={`btn btn--link ${classes.articleCard__link}`}>Read more &rarr;</Link>
            </div>
        </Card>
    );
};

export default ArticleCard;
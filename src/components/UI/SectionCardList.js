import classes from './SectionCardList.module.scss';
import Loading from './Loading';
import ArticleCard from '../ArticleCard';

const SectionCardList = props => {

    const articles = props.articles || [];
    const noArticlesText = props.noArticlesText || 'No Article to be displayed';

    return (
        <section className={classes.sectionCardList}>
            <h2 className={`heading-2 ${classes.sectionCardList__title}`} >{props.title}</h2>
            <div className={`${classes.sectionCardList__list} ${articles.length === 0 ? classes['sectionCardList__no-data'] : ''}`}>
                {props.loading && <Loading />}
                {
                    (!props.loading && articles.length > 0) &&
                    articles.map(article => {
                        return <ArticleCard key={article.id} article={article} />;
                    })
                }
                {(!props.loading && articles.length === 0) && <p>{noArticlesText}</p>}
            </div>
        </section>
    );
};

export default SectionCardList;
import classes from './Paginator.module.scss';
import sprite from '../../assets/sprite.svg';
import { Fragment } from 'react';


const Paginator = props => {

    const { totalPages, currentPage, nextPageClicked, previousPageClicked, pageClicked } = props;

    const calculatePageItems = () => {
        let startPage, endPage;

        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        const pagesArray = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        return pagesArray;
    };

    return (
        <div className={classes.paginator} >
            <button className={classes.paginator__btn} onClick={previousPageClicked} disabled={currentPage <= 1}>
                <svg className={`${classes.paginator__icon} ${currentPage <= 1 ? classes['paginator__icon--disabled'] : ''}`} >
                    <use href={sprite + '#icon-chevron-left'}></use>
                </svg>
            </button>

            <div className={classes.paginator__pages}>
                {
                    calculatePageItems().indexOf(1) === -1 && (
                        <Fragment>
                            <div className={classes.paginator__page} onClick={() => pageClicked(1)}>1</div>
                            <div className={classes.paginator__dots}>...</div>
                        </Fragment>
                    )
                }
                {
                    calculatePageItems().map(index => {
                        return (
                            <div
                                key={index}
                                className={`${classes.paginator__page} ${currentPage === index ? classes['paginator__page--selected'] : ''}`}
                                onClick={() => pageClicked(index)}
                            >
                                {index}
                            </div>
                        );
                    })
                }
                {
                    calculatePageItems().indexOf(totalPages) === -1 && (
                        <Fragment>
                            <div className={classes.paginator__dots}>...</div>
                            <div className={classes.paginator__page} onClick={() => pageClicked(totalPages)}>{totalPages}</div>
                        </Fragment>
                    )
                }
            </div>
            <button className={classes.paginator__btn} onClick={nextPageClicked} disabled={currentPage >= totalPages}>
                <svg className={`${classes.paginator__icon} ${currentPage >= totalPages ? classes['paginator__icon--disabled'] : ''}`} >
                    <use href={sprite + '#icon-chevron-right'}></use>
                </svg>
            </button>

        </div>
    );
};

export default Paginator;
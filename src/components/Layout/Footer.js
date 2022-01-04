import classes from './Footer.module.scss';

import sprite from '../../assets/sprite.svg';

const Footer = (props) => {
    return (
        <footer className={classes.footer}>

            <div className={classes.footer__updates}>
                <h3 className={`heading-3 ${classes.footer__title}`}>Get Updates</h3>
                <p className={classes.footer__updates__text}>
                    Enter your email address for updates about the most interesting articles in the web.
                </p>
                <form className={classes.footer__updates__form}>
                    <input type="text" className={classes.footer__updates__input} placeholder="Email address" />
                    <button className={classes.footer__updates__btn}>&#x21E7;</button>
                </form>
            </div>

            <div className={classes.footer__follow}>
                <h3 className={`heading-3 ${classes.footer__title}`}>Follow</h3>
                <ul className={classes.footer__list}>
                    <li className={classes.footer__list__item}>
                        <svg className={classes['footer__list__item-icon']}>
                            <use href={sprite + '#icon-facebook'}></use>
                        </svg>
                        <h4 className={classes['footer__list__item-title']}>Facebook</h4>
                    </li>
                    <li className={classes.footer__list__item}>
                        <svg className={classes['footer__list__item-icon']}>
                            <use href={sprite + '#icon-instagram'}></use>
                        </svg>
                        <h4 className={classes['footer__list__item-title']}>Instagram</h4>
                    </li>
                    <li className={classes.footer__list__item}>
                        <svg className={classes['footer__list__item-icon']}>
                            <use href={sprite + '#icon-twitter'}></use>
                        </svg>
                        <h4 className={classes['footer__list__item-title']}>Twitter</h4>
                    </li>
                </ul>
            </div>

            <div className={classes.footer__about}>
                <h3 className={`heading-3 ${classes.footer__title}`}>About</h3>
                <ul className={classes.footer__list}>
                    <li className={classes.footer__list__item}>
                        <h4 className={classes['footer__list__item-title']}>The Article Site</h4>
                    </li>
                    <li className={classes.footer__list__item}>
                        <h4 className={classes['footer__list__item-title']}>Contact us</h4>
                    </li>
                </ul>
            </div>

            <div className={classes.footer__divider}>
                <span></span>
            </div>

            <div className={classes.footer__copyright}>
                <p className={classes['footer__copyright-text']}>&copy; Copyright 2021 João Aroeira</p>
            </div>

        </footer>
    );
};

export default Footer;
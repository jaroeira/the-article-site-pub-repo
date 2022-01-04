import { useState, useEffect, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import classes from './Navbar.module.scss';
import debounce from 'lodash/debounce';

//UI
import MenuToggleButton from '../UI/MenuToggleButton';
import Backdrop from '../UI/Backdrop';
import AvatarImage from '../UI/AvatarImage';

//Redux
import { authSelector, signoutUser } from '../../store/auth-slice';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const { isAuthenticated, token, displayName, role, avatarImageUrl } = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('resize', debounce(() => {
            setIsOpen(false);
        }, 200));
    }, []);

    const toggleClickHandler = () => {
        setIsOpen(prevState => !prevState);
    };

    const navLinkClickHandler = () => {

        if (isOpen) {
            setIsOpen(false);
        }
    };

    const signoutClickHandler = () => {
        dispatch(signoutUser(token));
        if (isOpen) {
            setIsOpen(false);
        }
    };

    const bgWhite = props.bgWhite || isOpen;

    const backdrop = isOpen ? <Backdrop clicked={toggleClickHandler} styles={{ zIndex: '900' }} /> : null;

    return (
        <Fragment>
            <div className={`${classes.navbar} ${bgWhite ? classes['navbar--white'] : ''}`}>
                <Link to='/' className={classes.logo__link} onClick={navLinkClickHandler}>
                    <h3 className={`heading-3 ${classes.logo__text}`}>The Article Site</h3>
                </Link>

                <div className={`${classes.navbar__container} ${isOpen ? classes['navbar__container--is-open'] : ''}`}>
                    {isAuthenticated && ['Admin', 'Editor'].includes(role) && <NavLink to='/my-articles' className={`btn btn--white ${classes.navbar__link}`} activeClassName={classes.active} onClick={navLinkClickHandler}>My Articles</NavLink>}
                    {isAuthenticated && <NavLink to='/my-bookmarks' className={`btn btn--white ${classes.navbar__link}`} activeClassName={classes.active} onClick={navLinkClickHandler}>My Bookmarks</NavLink>}
                    {isAuthenticated && ['Admin', 'Editor'].includes(role) && <NavLink to='/new-article' className={`btn btn--white ${classes.navbar__link}`} activeClassName={classes.active} onClick={navLinkClickHandler}>New Article</NavLink>}
                    {isAuthenticated && ['Admin'].includes(role) && <NavLink to='/admin' className={`btn btn--white ${classes.navbar__link}`} activeClassName={classes.active} onClick={navLinkClickHandler}>Admin</NavLink>}
                    {!isAuthenticated && <NavLink to='/auth' className={`btn btn--white ${classes.navbar__link}`} activeClassName={classes.active} onClick={navLinkClickHandler}>Authenticate</NavLink>}
                    {isAuthenticated && <button className={`btn ${classes['navbar__signout-button']}`} onClick={signoutClickHandler}>Sign out</button>}
                    {isAuthenticated &&
                        <Link to='/auth/user-profile' className={classes['navbar__user-link']} onClick={navLinkClickHandler}>
                            <AvatarImage size='sm' imageUrl={avatarImageUrl} text={displayName} />
                        </Link>
                    }
                </div>

                <MenuToggleButton hideOnDesktop={true} clicked={toggleClickHandler} isOpen={isOpen} />

            </div>
            {backdrop}
        </Fragment >
    );
};

export default Navbar;
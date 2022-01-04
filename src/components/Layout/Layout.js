import { Fragment, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import classes from './Layout.module.scss';
import throttle from 'lodash/throttle';

const Layout = (props) => {

    const hideHeader = props.hideHeader ? true : false;
    const [didScrollPage, setDidScrollPage] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', throttle(() => runOnPageScroll(), 200));
    }, []);

    const runOnPageScroll = () => {
        if (window.scrollY > 60) {
            setDidScrollPage(true);
        } else {
            setDidScrollPage(false);
        }
    };

    return (
        <Fragment>
            <Navbar bgWhite={didScrollPage} />
            <div className={`${classes.container} ${hideHeader ? classes['container--no-header'] : ''}`}>
                {!hideHeader ? <Header /> : null}
                <main className={classes.main}>{props.children}</main>
                <Footer />
            </div>
        </Fragment>
    );
};

export default Layout;
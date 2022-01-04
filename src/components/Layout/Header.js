import classes from './Header.module.scss';
import SearchBox from '../UI/SearchBox';

const Header = (props) => {
    return (
        <header className={classes.header}>
            <h1 className='heading-1'>The Best Articles</h1>
            <h3 className="heading-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, iure porro!</h3>
            <SearchBox />
        </header>
    );
};

export default Header;
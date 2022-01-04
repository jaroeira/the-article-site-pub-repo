import classes from './DashboardCard.module.scss';
import sprite from '../../assets/sprite.svg';
import spinner from '../../assets/SVG/spinner.svg';

const DashboardCard = props => {

    const {
        label,
        value,
        icon,
        lightColor,
        darkColor,
        isLoading
    } = props;

    const hexToRgbA = (hex) => {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.8)';
        }
        throw new Error('Bad Hex');
    }

    const getLinearGradient = (lightColor, darkColor) => {
        return `linear-gradient(to right bottom, ${hexToRgbA(lightColor)}, ${hexToRgbA(darkColor)})`
    };

    return (
        <div className={classes.dashboardCard} style={{ backgroundImage: getLinearGradient(lightColor, darkColor) }}>
            {isLoading &&
                <div className={classes.dashboardCard__loading}>
                    <img src={spinner} className={classes.dashboardCard__spinner} alt='Loading' />
                    <p className={classes['dashboardCard__loading-text']}>Loading</p>
                </div>
            }
            {!isLoading && <><div className={classes.dashboardCard__value}>{new Intl.NumberFormat('en', { maximumSignificantDigits: 3 }).format(value)}</div>
                <div className={classes.dashboardCard__label}>{label}</div>
                <div className={classes.dashboardCard__icon}>
                    <svg>
                        <use href={sprite + `#${icon}`}></use>
                    </svg>
                </div></>}
        </div>
    );
};

export default DashboardCard;
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../store/auth-slice';

const ProtectedRoute = ({ component: Component, roles, ...restOfProps }) => {

    const { isAuthenticated, role } = useSelector(authSelector);

    return (
        <Route {...restOfProps} render={props => {

            //If not authenticated redirect to auth page
            if (!isAuthenticated) { return <Redirect to={{ pathname: '/auth', state: { from: props.location } }} /> }

            //check if route has role restrictions
            if (roles && roles.indexOf(role) === -1) {
                //unauthorized
                return <Redirect to='/' from='/' />
            }

            //if authorized 
            return <Component {...props} />
        }} />
    );
};

export default ProtectedRoute;
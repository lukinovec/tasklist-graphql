import { AUTH_TOKEN } from './constants';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

function ProtectedRoute(props) {

    return (
        <Route path={props.path}>
            {
                localStorage.getItem(AUTH_TOKEN) ? props.child
                    : <Redirect to={{ pathname: '/welcome', message: 'You have to log in to access this site' }}></Redirect>
            }
        </Route>
    )
}

ProtectedRoute.propTypes = {
    child: PropTypes.element
}

export default ProtectedRoute;
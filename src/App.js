import Welcome from './Welcome';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { AUTH_TOKEN } from './constants';
import React, { useState } from 'react';

function App() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const [loggedIn, setLoggedIn] = useState(authToken ? true : false);

    return (
        <Router>
            <Switch className="z-10">
                <Route path="/welcome">
                    <Welcome setLoggedIn={setLoggedIn} />
                </Route>
                <ProtectedRoute path="/" child={<Dashboard />} />
            </Switch>
            <nav className="absolute z-20">
                <ul className="flex p-2 m-1 space-x-2 font-bold">
                    {!loggedIn
                        ? <li className="p-2 font-bold text-gray-200 bg-gray-600 border border-gray-200 rounded-xl">
                            <Link to="/welcome">Log In</Link>
                        </li>
                        :
                        <React.Fragment>
                            <li className="p-2 font-bold text-gray-200 bg-gray-600 border border-gray-200 rounded-xl">
                                <Link to="/">Home</Link>
                            </li>
                            <li onClick={() => { localStorage.removeItem(AUTH_TOKEN); setLoggedIn(false) }} className="p-2 font-bold text-gray-200 bg-gray-600 border border-gray-200 cursor-pointer rounded-xl">
                                Log Out
                            </li>
                        </React.Fragment>

                    }
                </ul>
            </nav>
        </Router>
    )
}

export default App;

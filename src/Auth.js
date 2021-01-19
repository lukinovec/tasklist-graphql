import './Auth.css';
import Login from './Login';
import Register from './Register';
import { useState } from 'react';

function Auth(props) {
    const [isRegister, setIsRegister] = useState(false)
    return (
        <div>
            <span className="p-4 my-2 font-extrabold text-center text-7xl">{isRegister ? "Register" : "Login"}</span>
            { isRegister
                ? <Register setLoggedIn={props.setLoggedIn} />
                : <Login setLoggedIn={props.setLoggedIn} />
            }

            <button onClick={() => setIsRegister(!isRegister)} className="p-4 text-lg font-bold text-center underline focus:outline-none">{isRegister ? "Click here if you already are a member" : "Click here to become a member"}</button>
        </div>
    )
}

export default Auth;
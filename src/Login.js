import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import SubmitButton from './SubmitButton';
import { AUTH_TOKEN, LOGGED_USER_NAME } from './constants';
import { useHistory } from 'react-router';
import { gql, useMutation } from '@apollo/client';
import * as yup from 'yup';

let schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
});


function Login(props) {
    const history = useHistory();
    const [loginError, setError] = useState(false);
    const [mounted, setMounted] = useState(false);
    const LOGIN_MUTATION = gql`
      mutation LoginMutation(
        $username: String!
        $password: String!
      ) {
        login(username: $username, password: $password) {
          token
          user {
              username
          }
        }
      }
    `;

    const [loginMutation] = useMutation(LOGIN_MUTATION);
    const handleLogin = async (credentials) => {
        try {
            const { data } = await loginMutation({ variables: credentials });
            console.log(JSON.stringify(data, null, 2))
            localStorage.setItem(AUTH_TOKEN, data.login.token);
            localStorage.setItem(LOGGED_USER_NAME, data.login.user.username);
            props.setLoggedIn(true);
            history.push("/");
        }
        catch (e) {
            console.log(JSON.stringify(e, null, 2))
            setError(e)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 100)
    }, [])
    return (
        <div className={`transition duration-150 ease-out opacity-${mounted ? '100' : '0'}`}>
            {loginError &&
                <span className="p-2 text-base font-bold text-red-500">Login Error: {loginError.graphQLErrors[0].message}</span>
            }
            <div className="p-4 my-6 bg-gray-600 shadow-2xl rounded-xl">
                <Formik initialValues={{ username: "", password: "" }} validationSchema={schema} onSubmit={(values) => handleLogin(values)}>
                    {() => (
                        <Form className="flex flex-col text-xl font-normal text-gray-200 bg-transparent">
                            <Field placeholder="Username" className={`form-field`} name="username"></Field>
                            <Field placeholder="Password" className={`form-field`} name="password" type="password"></Field>
                            <SubmitButton type="submit" />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login;
import { Formik, Field, Form } from 'formik';
import * as yup from "yup";
import SubmitButton from "./SubmitButton";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AUTH_TOKEN, LOGGED_USER_NAME } from './constants';
import { gql, useMutation } from '@apollo/client';

let schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Email is not valid').required('Email is required'),
    password: yup.string().required('Password is required'),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required')
});



function Register(props) {
    const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
          username
      }
    }
  }
`;

    const history = useHistory();
    const [mounted, setMounted] = useState(false);
    const [registerError, setError] = useState("");
    const [registerMutation] = useMutation(SIGNUP_MUTATION);
    const handleRegister = async (credentials) => {
        try {
            const { data } = await registerMutation({
                variables: credentials
            });
            localStorage.setItem(AUTH_TOKEN, data.register.token);
            localStorage.setItem(LOGGED_USER_NAME, data.register.user.username);
            props.setLoggedIn(true);
            history.push("/");
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 100)
    }, [])
    return (
        <div className={`transition duration-150 ease-out opacity-${mounted ? '100' : '0'}`}>
            {registerError.message &&
                <pre className="text-sm">
                    {registerError.message}
                </pre>
            }
            <div className="p-4 my-6 bg-gray-600 shadow-2xl rounded-xl">
                <Formik initialValues={{ username: "", email: "", password: "", passwordConfirmation: "" }} validationSchema={schema} onSubmit={(values) => handleRegister(values)}>
                    {({ errors }) => (
                        <Form className="flex flex-col text-xl font-normal text-gray-200 bg-transparent">
                            <Field placeholder="Username" className={`form-field ${errors.username ? 'border-red-600 border-b-2' : ''}`} name="username"></Field>
                            <Field placeholder="Email" className={`form-field ${errors.email ? 'border-red-600 border-b-2' : ''}`} name="email"></Field>
                            <Field placeholder="Password" className={`form-field ${errors.password ? 'border-red-600 border-b-2' : ''}`} name="password" type="password"></Field>
                            <Field placeholder="Password confirmation" className={`form-field ${errors.passwordConfirmation ? 'border-red-600 border-b-2' : ''}`} name="passwordConfirmation" type="password"></Field>
                            <SubmitButton type="submit" />
                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    )
}
export default Register;
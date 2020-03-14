import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from "@apollo/client";

import UserForm from "../components/UserForm";

const SIGNIN_USER = gql`
    mutation signIn($email: String, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

const SignIn = props => {
    useEffect(() => {
        // update the document title
        document.title = 'Sign In — Notedly';
    });

    const client = useApolloClient();

    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            // store the token
            localStorage.setItem("token", data.signIn);
            // update local cache
            client.writeData({ data: { isLoggedIn: true } });
            // reditrect the user
            props.history.push("/");
        }
    })

    return (
    <React.Fragment>
        <UserForm action={signIn} formType="signin" />
        {loading && <p>Loading...</p>}
        z
        {error && <p>Error signing in...</p>}
    </React.Fragment>
    );
};

export default SignIn;
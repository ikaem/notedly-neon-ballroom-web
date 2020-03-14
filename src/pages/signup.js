import React, { useEffect } from "react";
import { useMutation, useApolloClient, gql } from "@apollo/client";
import styled from "styled-components";

import UserForm from "../components/UserForm";

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

// inclued props passed to the component
const SignUp = props => {

    useEffect(() => {
        // update the document.title
        document.title = "Sign Up - Notedly";
    });

    // apollo client
    const client = useApolloClient();

    // add the mutation hook
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // put token into local storage...
            localStorage.setItem("token", data.signUp);
            // upfate the local cache - the apollo stroe i guess
            client.writeData({ data: { isLoggedIn: true } });
            // redirect user to the homepage
            props.history.push("/");
        }
    })

    return (
        <React.Fragment>
            <UserForm
                action={signUp}
                formType="signup"/>
            {/* if data loading, after signup, displa loading message */}
            {loading && <p>Loading...</p>}
            {/* if error, display error message */}
            {error && <p>Error creating an account</p>}
        </React.Fragment>
    );
}

export default SignUp;
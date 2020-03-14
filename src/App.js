import React from "react";
import ReactDOM from "react-dom";
import { 
    ApolloClient, 
    ApolloProvider, 
    InMemoryCache,
    createHttpLink } from "@apollo/client";
import { setContext } from "apollo-link-context";

import Pages from "./pages";
import GlobalStyle from "./components/GlobalStyle";

// configure our API URI and cache
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// check for a token in the local storage and return the headers to the contxt
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem("token") || ""
        }
    };
});

// configure Apollo CLient
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
});

// check for local token
const data = {
    isLoggedIn: !!localStorage.getItem("token")
};
// write the cache data on initial load - cache being apollos store...
cache.writeData({ data });
// write the cache data after the store is reset
client.onResetStore(() => cache.writeData({ data }));

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle/>
            <Pages />
        </ApolloProvider>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));
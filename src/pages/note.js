import React from "react";
import { useQuery, gql } from "@apollo/client";

import Note from "../components/Note";
import { GET_NOTE } from "../gql/query";

const NotePage = props => {
    // store the id from the url as a variable
    const { id } = props.match.params;

    // query hook, and passig the id as variable to the query
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

    // if loading, display loading...
    if(loading) return <p>Loading...</p>
    // if error, display error...
    if(error) return <p>Error! Note not found</p>
    // if data good, display UI
    return <Note note={data.note} />
}

export default NotePage;
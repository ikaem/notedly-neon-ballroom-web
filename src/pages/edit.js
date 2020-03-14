import React from "react";
import { useQuery, useMutation } from "@apollo/client";

import NoteForm from "../components/NoteForm";
import { GET_NOTE, GET_ME } from "../gql/query";
import { EDIT_NOTE } from "../gql/mutation";

const EditNote = props => {
    // store the id from the url as a variable
    const { id } = props.match.params;

    // query hook, and passig the id as variable to the query
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
    const { data: userdata } = useQuery(GET_ME);
    // define the mutation - see how this makes sense with the variable beign called aedit note...
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    })


    // if loading, display loading...
    if(loading) return <p>Loading...</p>
    // if error, display error...
    if(error) return <p>Error! Note not found</p>
    // if no match for users 
    if(userdata && userdata.me.id !== data.note.author.id ) {
        return <p>You do not have access to edit this note...</p>
    }
    // if data good, display UI
    return <NoteForm content={data.note.content} action={editNote} />
}

export default EditNote;
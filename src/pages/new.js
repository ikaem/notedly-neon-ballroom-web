import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import NoteForm from "../components/NoteForm";

// import the query for refetch
import { GET_NOTES, GET_MY_NOTES } from "../gql/query";

// new note mutation query
const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;

const NewNote = props => {
    useEffect(() => {
        // update the document title
        document.title = 'New Note — Notedly';
    });
    // this data thing, the first one, should be colled differently, prolly like newNoteMutation or similar...
    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        // adding refetch queries to make the mutation do the refetch of the get notes query too
        refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
        onCompleted: data => {
            // when complete, redirect the user to the note page
            props.history.push(`note/${data.newNote.id}`);
        }
    });

    return (
        <React.Fragment>
            {loading && <p>Loading...</p>}
            {error && <p>Error saving the note...</p>}
            <NoteForm action={data} />
        </React.Fragment>
    );
};

export default NewNote;
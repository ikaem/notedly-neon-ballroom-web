import React from "react";

import { useMutation } from "@apollo/client";
import { withRouter } from "react-router-dom";

import ButtonAsLink from "./ButtonAsLink";
import { DELETE_NOTE } from "../gql/mutation";
import { GET_NOTES, GET_MY_NOTES } from "../gql/query";

const DeleteNote = props => {

    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteId
        },
        // refetch the notes we need to update th cache
        refetchQueries: [{query: GET_MY_NOTES}, {query: GET_NOTES}],
        onCompleted: data => {
            // redirect the user
            props.history.push("/mynotes");
            console.log("logging deleteNote", deleteNote);
        }
    })
    // and here we just assign delete note to onclick event on the button
    return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>
};

export default withRouter(DeleteNote);
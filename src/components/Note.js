import React from "react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
// import logged in user ui compoentn
import NoteUser from "./NoteUser";
// import islogged in local query
import { IS_LOGGED_IN } from "../gql/query";

// keep note from extending wider that 800px
const StyledNote = styled.article`
    max-width: 800px;
    margin: 0 auto;
`;

// style the note metadata
const MetaData = styled.div`
    @media (min-width: 500px) {
        display: flex;
        align-items: top;
    }
`;

// add space between avatar and meta info
const MetaInfo = styled.div`
    padding-right: 1em;
`;

// align useractions to the right on large screens
const UserActions = styled.div`
    margin-left: auto;
`;

const Note = ({ note }) => {

    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error</p>

    return (
    <StyledNote key={note.id}>
        <MetaData>
            <MetaInfo>
                <img
                    src={note.author.avatar}
                    alt={`${note.author.username} avatar`}
                    height="50px"/>
            </MetaInfo>
            <MetaInfo>
                { ` ` }
                {note.author.username} { ` `}
                {/* update the date markup to format as day month year */}
                {format(note.createdAt, "Do MMMM YYYY")} { ` ` }
            </MetaInfo>
            {data.isLoggedIn? (
                <UserActions>
                    <NoteUser note={note} />
                </UserActions>
            ) : (<UserActions>
                    <em>Favorites:</em> {note.favoriteCount} { ` ` }
            </UserActions>)}
        </MetaData>
        <ReactMarkdown source={note.content}/>
    </StyledNote>
    )
}

export default Note;
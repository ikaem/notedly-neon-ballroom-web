import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import ButtonAsLink from "./ButtonAsLink";

import { TOGGLE_FAVORITE } from "../gql/mutation";
import { GET_MY_FAVORITES } from "../gql/query";

const FavoriteNote = props => {
    // store favorite count as astate, because we will beed to re-render if this value changes...
    // we cnat rerender from nomral variable...
    const [count, setCount] = useState(props.favoriteCount);
    // store in state if the user has favorited the note
    const [noteIsFavorited, setNoteIsFavorited] = useState(
        // first check if the note exists in the user fave list
        props.me.favorites.filter(note => note.id === props.noteId).length > 0
    );

    // toggle favorite mutaton hook
    const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
        variables: {
            id: props.noteId
        },
        // refetch my favorites
        refetchQueries: [{query: GET_MY_FAVORITES}]
    });

    return (
    <React.Fragment>
        {noteIsFavorited? (
            <ButtonAsLink
                onClick={() => {
                    toggleFavorite();
                    setNoteIsFavorited(false);
                    setCount(count - 1);
                }}>Remove Favorite
            </ButtonAsLink>
        ): (
            <ButtonAsLink
                onClick={() => {
                    toggleFavorite();
                    setNoteIsFavorited(true);
                    setCount(count + 1);
                }}>Add Favorite
            </ButtonAsLink>
        )}
        : {count}
    </React.Fragment>
    )
};

export default FavoriteNote;


import React from "react";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

import Button from "../components/Button";
import NoteFeed from "../components/NoteFeed";

// this is graphql query, and we store it as a variable
// so we can use it later

const GET_NOTES = gql`
    query NoteFeed($cursor: String){
        noteFeed(cursor: $cursor) {
            cursor,
            hasNextPage
            notes {
                id
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;


const Home = () => {

    // query hook
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
    
    const fetchMoreNotes = () => {
        fetchMore({
            variables: {
                cursor: data.noteFeed.cursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                    noteFeed: {
                        cursor: fetchMoreResult.noteFeed.cursor,
                        hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                        // combine the new and old result
                        notes: [
                            ...previousResult.noteFeed.notes,
                            ...fetchMoreResult.noteFeed.notes
                        ],
                        __typename: "noteFeed"
                    }
                }
            }
        })
    }

    // if data loading, display loading message
    if(loading) return <p>Loading...</p>;

    // if there is an error fetching the data, display an error message
    if(error) return <p>There was an error</p>

    // if the data is successful, display the data
    return (
        // add react fragment element 
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes} />
            {/* now only display load more button if has next page is true */}
            {data.noteFeed.hasNextPage && (
                <Button 
                    onClick={fetchMoreNotes}
                >Load more</Button>
            )}
        </React.Fragment>
    )
}

export default Home;
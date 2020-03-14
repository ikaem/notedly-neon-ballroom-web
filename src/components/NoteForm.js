import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
const Wrapper = styled.div`
    height: 100%;
`;
const Form = styled.form`
    height: 100%;
`;
const TextArea = styled.textarea`
    width: 100%;
    height: 90%;
`

const NoteForm = props => {
    // set the default state of the form
    const [value, setValue] = useState({ content: props.content || ""});

    // update the state when the user types in the form
    const handleChange = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    console.log("props.action, but actualy data", props.action);

    return (
        <Wrapper>
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    props.action({
                        variables: {
                            ...value
                        }
                    });
                }}
            >
                <TextArea
                    required
                    type="text"
                    name="content"
                    placeholder="Note Content"
                    value={value.content}
                    onChange={handleChange}
                />
                <Button type="submit">Save</Button>
            </Form>
        </Wrapper>
    );
}

export default NoteForm;
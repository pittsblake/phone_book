import React from 'react';
import styled from 'styled-components'

const EditContact = (props) => {
    return (
        <Container>
            <EditForm onSubmit={props.handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={props.handleChange}
                />
                <input
                    type="text"
                    name="number"
                    placeholder="Phone Number"
                    onChange={props.handleChange}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={props.handleChange}
                />
                <select name="category" onChange={props.handleChange}>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="family">Family</option>
                </select>
                <button>Submit</button>
            </EditForm>
        </Container>
    );
};

export default EditContact;

const Container = styled.div`
    width: 90%;
`

const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 65%;

    select {
        width: 75%
    }
`


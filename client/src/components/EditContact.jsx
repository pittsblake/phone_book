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
                    <SubmitButton>Submit</SubmitButton>
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

const SubmitButton = styled.button`
    width: 20%;
    display: block;
    margin-bottom: 10px;
    position: relative;
    text-align: center;
    font-size: 14px;
    font-family: 'Arial', sans-serif;
    font-weight: 700;
    height: 36px;
    padding: 0 8px;
    border: 0px;
    color: #fff;
    text-shadow: 0 1px rgba(0,0,0,0.1); 
    background-color: #4d90fe; 
    &&:hover{
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
    }
`
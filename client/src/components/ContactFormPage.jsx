import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'


class ContactFormPage extends Component {
    state = {
        contact: {
            name: '',
            number: '',
            email: '',
            category: 'personal'
        }
    }

    handleChange = (event) => {
        const attribute = event.target.name
        const newContact = { ...this.state.contact }
        newContact[attribute] = event.target.value
        this.setState({ contact: newContact })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        event.target.reset()
        const payload = {
            contact: this.state.contact
        }
        const res = await axios.post('/api/contacts', payload)
        this.props.getAllContacts()
        this.props.toggleContactForm()
    }

    render() {
        return (
            <FormContainer>
                <ActualForm onSubmit={this.handleSubmit}>
                    <h1>Add New Contact</h1>
                    <ContactInput
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={this.handleChange}
                    />
                    <ContactInput
                        type="text"
                        name="number"
                        placeholder="Phone Number"
                        onChange={this.handleChange}
                    />
                    <ContactInput
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                    />
                    <select name="category" onChange={this.handleChange}>
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="family">Family</option>
                    </select>
                    <FormButton>Submit</FormButton>
                </ActualForm>
            </FormContainer>
        );
    }
}

export default ContactFormPage;

const FormContainer = styled.div`
    height: 80vh;
    width: 35%;
`
const ActualForm = styled.form`
    height: 75%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const FormButton = styled.button`
    width: 70%;
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

const ContactInput = styled.input`
    width: 70%
`
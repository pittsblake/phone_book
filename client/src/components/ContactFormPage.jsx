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
                    <button>Submit</button>
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

const ContactInput = styled.input`
    width: 70%
`
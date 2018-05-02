import React, { Component } from 'react';
import axios from 'axios';


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
        const newContact = {...this.state.contact}
        newContact[attribute] = event.target.value
        this.setState({ contact: newContact})
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        event.target.reset()
        const payload = {
            contact: this.state.contact
        }
        const res = await axios.post('/api/contacts', payload)
        this.props.toggleContactForm()
        this.props.getAllContacts()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={this.handleChange}
                    />
                    <input 
                    type="text"
                    name="number"
                    placeholder="Phone Number"
                    onChange={this.handleChange}
                    />
                    <input 
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
                </form>
            </div>
        );
    }
}

export default ContactFormPage;
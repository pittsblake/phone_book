import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import ContactFormPage from './ContactFormPage'

class AllContacts extends Component {
    state = {
        contacts: [],
        showNewContactForm: false,
        search: '',
    }

    async componentWillMount(){
        await this.getAllContacts()
    }

    getAllContacts = async () => {
        const response = await axios.get('/api/contacts') 
        console.log('RESPONSE', response.data)
        this.setState({
            contacts: response.data
        })
    }

    deleteContact = async (contactId) => {
        await axios.delete(`/api/contacts/${contactId}`)
        this.getAllContacts()
    }

    toggleContactForm = () => {
        this.setState({showNewContactForm: !this.state.showNewContactForm})
    }

    updateSearch = (event) => {
        this.setState({search: event.target.value.substr(0,15)})
    }

    render() {
        let filteredContacts = this.state.contacts.filter((contact) => {
            return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })

        return (
            <div>
                <input type="text" value={this.state.search}
                    onChange={this.updateSearch}
                />
                
                <button onClick={this.toggleContactForm}>+</button>

                {
                    this.state.showNewContactForm ? <ContactFormPage toggleContactForm = {this.toggleContactForm}
                    getAllContacts = {this.getAllContacts}
                    /> : null
                }

                {
                    filteredContacts.map((people, i) => {
                        return (
                            <div key={i}>
                                <Link to={`/contacts/${people.id}`}> <h1>{people.name}</h1> </Link>
                                <button onClick={()=>{this.deleteContact(people.id)}}>Delete</button>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default AllContacts;
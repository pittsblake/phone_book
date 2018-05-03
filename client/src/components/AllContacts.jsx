import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import ContactFormPage from './ContactFormPage'
import PersonalContacts from './sortedContacts/PersonalContacts'
import WorkContacts from './sortedContacts/WorkContacts'
import FamilyContacts from './sortedContacts/FamilyContacts'

class AllContacts extends Component {
    state = {
        contacts: [],
        showNewContactForm: false,
        search: '',
        showAllContacts: true,
        showPersonalContacts: false,
        showWorkContacts: false,
        showFamilyContacts: false
    }

    async componentWillMount() {
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
        this.setState({ showNewContactForm: !this.state.showNewContactForm })
    }

    updateSearch = (event) => {
        this.setState({ search: event.target.value.substr(0, 15) })
    }
    
    toggleAllContacts = (event) => {
        this.setState({
            showPersonalContacts: false,
            showAllContacts: !this.state.showAllContacts,
            showWorkContacts: false,
            showFamilyContacts: false
        })
    }

    togglePersonalContacts = () => {
        this.setState({ 
            showPersonalContacts: !this.state.showPersonalContacts,
            showAllContacts: false,
            showWorkContacts: false,
            showFamilyContacts: false
        })
    }

    toggleShowWorkContacts = () => {
        this.setState({ 
            showPersonalContacts: false,
            showAllContacts: false,
            showWorkContacts: !this.state.showWorkContacts,
            showFamilyContacts: false
        })
    }

    toggleShowFamilyContacts = () => {
        this.setState({ 
            showPersonalContacts: false,
            showAllContacts: false,
            showWorkContacts: false,
            showFamilyContacts: !this.state.showFamilyContacts
        })
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
                    this.state.showNewContactForm ? <ContactFormPage toggleContactForm={this.toggleContactForm}
                        getAllContacts={this.getAllContacts}
                    /> : null
                }
                <div>
                    <button onClick={this.toggleAllContacts}>All</button>
                    <button onClick={this.togglePersonalContacts}>Personal</button>
                    <button onClick={this.toggleShowWorkContacts}>Work</button>
                    <button onClick={this.toggleShowFamilyContacts}>Family</button>
                </div>
                {
                    this.state.showAllContacts || this.state.showPersonalContacts == false && this.state.showWorkContacts == false && this.state.showFamilyContacts == false ?
                    filteredContacts.map((people, i) => {
                        return (
                            <div key={i}>
                                <Link to={`/contacts/${people.id}`}> <h1>{people.name}</h1> </Link>
                                <button onClick={() => { this.deleteContact(people.id) }}>Delete</button>
                            </div>
                        )
                    }) : null
                }

                { this.state.showPersonalContacts ? filteredContacts.map((contact) => {
                    return <PersonalContacts contact={contact} /> 
                }) : null }

                { this.state.showWorkContacts ? filteredContacts.map((contact) => {
                    return <WorkContacts contact={contact} /> 
                }) : null }

                { this.state.showFamilyContacts ? filteredContacts.map((contact) => {
                    return <FamilyContacts contact={contact} /> 
                }) : null }

            </div>
        );
    }
}

export default AllContacts;
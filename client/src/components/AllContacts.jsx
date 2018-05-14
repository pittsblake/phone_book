import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ContactFormPage from './ContactFormPage'
import PersonalContacts from './sortedContacts/PersonalContacts'
import WorkContacts from './sortedContacts/WorkContacts'
import FamilyContacts from './sortedContacts/FamilyContacts'
import Nav from './Nav'

class AllContacts extends Component {
    state = {
        contacts: [],
        showNewContactForm: false,
        search: '',
        category: 'all',
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


    toggleCategory = (event) => {
        this.setState({
            category: event.target.value
        })
    }


    render() {
        let filteredContacts = this.state.contacts.filter((contact) => {
            return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })

        console.log('Filtered Contacts', filteredContacts)

        return (
            <div>
                <NavBar>
                    <a href='#' onClick={this.props.signOut}>Sign Out</a>
                    <input className="search" type="text" value={this.state.search}
                        onChange={this.updateSearch} placeholder='Search'
                    />
                </NavBar>

                <Content>


                    <Body>
                        <ContactFormPage
                            toggleContactForm={this.toggleContactForm}
                            getAllContacts={this.getAllContacts}
                        />
                        <div>
                            <Category className="row-center">
                                <Options value='all' onClick={this.toggleCategory}>All</Options >
                                <Options value='personal' onClick={this.toggleCategory}>Personal</Options >
                                <Options value='work' onClick={this.toggleCategory}>Work</Options >
                                <Options value='family' onClick={this.toggleCategory}>Family</Options >
                            </Category>
                            <EveryContacts>


                                {
                                    this.state.category === 'all' ? filteredContacts.map((people, i) => {
                                        return (
                                            <Contact key={i}>
                                                <i className="fas fa-trash" onClick={() => { this.deleteContact(people.id) }}></i>
                                                <Link to={`/contacts/${people.id}`}> <h1>{people.name}</h1> </Link>
                                            </Contact>
                                        )
                                    })
                                    :
                                    filteredContacts.map((people, i) => {
                                        if (this.state.category === people.category)
                                            return (
                                                <Contact key={i}>
                                                    <i className="fas fa-trash" onClick={() => { this.deleteContact(people.id) }}></i>
                                                    <Link to={`/contacts/${people.id}`}> <h1>{people.name}</h1> </Link>
                                                </Contact>
                                            )
                                    })
                                }
                            </EveryContacts>
                        </div>
                    </Body>
                </Content>
            </div>
        );
    }
}

export default AllContacts;

const NavBar = styled.div`
    display: flex;
    justify-content: space-between;

    input {
        margin-right: 2vw;
    }
`

const Category = styled.div`
    margin-top: 10vh;
    height: 8vh;

`

const Options = styled.button`
    margin-right: 3em;
    text-decoration: none;
    font-size: 30px;
    color: black

    &&:hover{
        border-bottom: 1px solid black
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const Contact = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60%;

    i {
        padding-right: 10px;
    } 
`

const Body = styled.div`
    display: flex;
    justify-content: space-around;
`

const EveryContacts = styled.div`
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`

const FormContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
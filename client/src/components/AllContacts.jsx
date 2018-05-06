import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import ContactFormPage from './ContactFormPage'
import PersonalContacts from './sortedContacts/PersonalContacts'
import WorkContacts from './sortedContacts/WorkContacts'
import FamilyContacts from './sortedContacts/FamilyContacts'
import Nav from './Nav';
import ContactShowPage from './ContactShowPage';


class AllContacts extends Component {
    state = {
        contacts: [],
        showNewContactForm: false,
        search: '',
        showAllContacts: true,
        showPersonalContacts: false,
        showWorkContacts: false,
        showFamilyContacts: false,
        modalIsOpen: false
    }

    async componentWillMount() {
        await this.getAllContacts()
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }
    closeModal = () => {
        this.setState({ modalIsOpen: false });
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

    getContact = async (id) => {
        //const contactId = this.props.match.params.id
        const res = await axios.get(`/api/contacts/${id}`)
        this.setState({
            contact: res.data
        })
    }

    openModalForContact = (id) => {
        this.getContact(id)
        this.openModal();
    }

    render() {
        let filteredContacts = this.state.contacts.filter((contact) => {
            return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })

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
                                <Options href="#" onClick={this.toggleAllContacts}>All</Options >
                                <Options href="#" onClick={this.togglePersonalContacts}>Personal</Options >
                                <Options href="#" onClick={this.toggleShowWorkContacts}>Work</Options >
                                <Options href="#" onClick={this.toggleShowFamilyContacts}>Family</Options >
                            </Category>
                            <EveryContacts>

                                {
                                    this.state.showAllContacts || this.state.showPersonalContacts == false && this.state.showWorkContacts == false && this.state.showFamilyContacts == false ?
                                        filteredContacts.map((people, i) => {
                                            return (
                                                <Contact key={i}>
                                                    <i class="fas fa-trash" onClick={() => { this.deleteContact(people.id) }}></i>
                                                    <a href='#' onClick={() => this.openModalForContact(people.id)}> <h1>{people.name}</h1> </a>
                                                </Contact>
                                            )
                                        }) : null
                                }

                                {this.state.showPersonalContacts ? filteredContacts.map((contact) => {
                                    return <PersonalContacts contact={contact} deleteContact={this.deleteContact} />
                                }) : null}

                                {this.state.showWorkContacts ? filteredContacts.map((contact) => {
                                    return <WorkContacts contact={contact} deleteContact={this.deleteContact} />
                                }) : null}

                                {this.state.showFamilyContacts ? filteredContacts.map((contact) => {
                                    return <FamilyContacts contact={contact} deleteContact={this.deleteContact} />
                                }) : null}
                            </EveryContacts>

                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel="Example Modal" >
                                {
                                    this.state.modalIsOpen ? <ContactShowPage getContact={this.getContact}/> : null
                                }
                            </Modal>
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

const Options = styled.a`
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

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
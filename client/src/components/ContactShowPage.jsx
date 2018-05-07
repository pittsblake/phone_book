import React, { Component } from 'react';
import axios from 'axios';
import EditContact from './EditContact'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class ContactShowPage extends Component {
    state = {
        contact: {},
        showEditForm: false
    }

    componentDidMount() {
        this.getContact()
    }

    getContact = async () => {
        const contactId = this.props.match.params.id
        const res = await axios.get(`/api/contacts/${contactId}`)
        this.setState({
            contact: res.data
        })
    }

    toggleEditForm = () => {
        this.setState({ showEditForm: !this.state.showEditForm })
    }

    handleChange = (event) => {
        const attribute = event.target.name
        const updateContact = { ...this.state.contact }
        updateContact[attribute] = event.target.value
        this.setState({ contact: updateContact })
    }

    handleSubmit = async (event) => {
        const contactId = this.props.match.params.id
        event.preventDefault();
        //event.target.reset();
        const payload = {
            contact: this.state.contact
        }

        const res = await axios.patch(`/api/contacts/${contactId}`, payload)
        this.setState({ contact: res.data })
        this.getContact();
        this.toggleEditForm();
    }

    render() {
        return (
            <Container>
                <Nav>
                    <Link to='/contacts'>All Contacts</Link>
                    <a href='#' onClick={this.props.signOut}>Sign Out</a>
                </Nav>
                <EditButton onClick={this.toggleEditForm}>Edit</EditButton>

                {
                    this.state.showEditForm ? <EditContact contact={this.state.contact} handleChange={this.handleChange} handleSubmit={this.handleSubmit} /> : null
                }

                <table>
                    <tr>
                        <td className="bold">Name</td>
                        <td className="bold">Phone Number</td>
                        <td className="bold">Email</td>
                        <td className="bold">Type</td>
                    </tr>
                    <tr>
                        <td>{this.state.contact.name}</td>
                        <td>{this.state.contact.number}</td>
                        <td>{this.state.contact.email}</td>
                        <td>{this.state.contact.category}</td>
                    </tr>
                </table>
            </Container>
        );
    }
}

export default ContactShowPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    table {
        width: 65%;
    }

    tr {
        text-align: center;
    }
`
const EditButton = styled.button`
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
    background-color: green; 
    &&:hover{
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
    }
`

const Nav = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    height: 10vh;

    a {
        margin-left: 12px;
    }
`
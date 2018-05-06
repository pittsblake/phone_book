import React, { Component } from 'react';
import axios from 'axios';
import EditContact from './EditContact'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

class ContactShowPage extends Component {
    state = {
        contact: {},
        showEditForm: false
    }

    componentDidMount() {
        this.props.getContact()
    }

    toggleEditForm = () => {
        this.setState({showEditForm: !this.state.showEditForm})
    }

    handleChange = (event) => {
        const attribute = event.target.name 
        const updateContact = {...this.state.contact}
        updateContact[attribute] = event.target.value 
        this.setState({ contact: updateContact})
    }

    handleSubmit = async (event) => {
        const contactId = this.props.match.params.id
        event.preventDefault();
        //event.target.reset();
        const payload = {
            contact: this.state.contact
        }

        const res = await axios.patch(`/api/contacts/${contactId}`, payload)
        this.setState({contact: res.data})
        this.getContact();
        this.toggleEditForm();
    }

    render() {
        return (
            <MainBox>
                <EditButton onClick={this.toggleEditForm}>Edit</EditButton>

                {
                    this.state.showEditForm ? <EditContact contact={this.state.contact} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/> : null
                }

                <table>
                    <tr>
                        <td>Name</td>
                        <td>Phone Number</td>
                        <td>Email</td>
                        <td>Type</td>
                    </tr>
                    <tr>
                        <td>{this.state.contact.name}</td>
                        <td>{this.state.contact.number}</td>
                        <td>{this.state.contact.email}</td>
                        <td>{this.state.contact.category}</td>
                    </tr>
                </table>
            </MainBox>
        );
    }
}

export default ContactShowPage;

const MainBox = styled.div`
    height: 50vh;
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    td {
        padding-right: 1em;
    }
`

const EditButton = styled.button`
    width: 50%;
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
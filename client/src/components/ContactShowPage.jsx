import React, { Component } from 'react';
import axios from 'axios';
import EditContact from './EditContact'
import {Link} from 'react-router-dom'

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
            <div>
                <Link to='/contacts'>All Contacts</Link>
                <button onClick={this.toggleEditForm}>Edit</button>

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
            </div>
        );
    }
}

export default ContactShowPage;
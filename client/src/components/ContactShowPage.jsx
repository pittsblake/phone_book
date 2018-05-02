import React, { Component } from 'react';
import axios from 'axios'

class ContactShowPage extends Component {
    state = {
        contact: {}
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

    render() {
        return (
            <div>
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
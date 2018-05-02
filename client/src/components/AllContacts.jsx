import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


class AllContacts extends Component {
    state = {
        contacts: [],
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

    render() {
        return (
            <div>
                {
                    this.state.contacts.map((people, i) => {
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
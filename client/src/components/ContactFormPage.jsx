import React, { Component } from 'react';

class ContactFormPage extends Component {
    render() {
        return (
            <div>
                <form>
                    <input 
                    type="text"
                    placeholder="Name"
                    />
                    <input 
                    type="text"
                    placeholder="Phone Number"
                    />
                    <input 
                    type="text"
                    placeholder="Email"
                    />
                    <input 
                    type="text"
                    placeholder="name"
                    />
                </form>
            </div>
        );
    }
}

export default ContactFormPage;
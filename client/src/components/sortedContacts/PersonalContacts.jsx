import React from 'react';
import {Link} from 'react-router-dom'

const PersonalContacts = (props) => {
    return (
        <div>
            {
                props.contact.category === 'personal' ? 
                <div>
                    <Link to={`/contacts/${props.contact.id}`}><h1>{props.contact.name}</h1></Link>
                </div>: null
            }
        </div>
    );
};

export default PersonalContacts;
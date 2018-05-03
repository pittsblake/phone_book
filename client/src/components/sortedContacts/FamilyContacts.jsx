import React from 'react';
import {Link} from 'react-router-dom'

const FamilyContacts = (props) => {
    return (
        <div>
            {
                props.contact.category === 'family' ? 
                <div>
                    <Link to={`/contacts/${props.contact.id}`}><h1>{props.contact.name}</h1></Link>
                </div>: null
            }
        </div>
    );
};

export default FamilyContacts;
import React from 'react';
import {Link} from 'react-router-dom'

const WorkContacts = (props) => {
    return (
        <div>
            {
                props.contact.category === 'work' ? 
                <div>
                    <Link to={`/contacts/${props.contact.id}`}><h1>{props.contact.name}</h1></Link>
                </div>: null
            }
        </div>
    );
};

export default WorkContacts;
import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const PersonalContacts = (props) => {

    return (
        <div className="contact">
            {
                props.contact.category === 'personal' ? 
                <Contact key={props.contact.id}>
                    <i className="fas fa-trash" onClick={() => { props.deleteContact(props.contact.id) }}></i>
                    <Link to={`/contacts/${props.contact.id}`}><h1>{props.contact.name}</h1></Link>
                </Contact>: null
            }
        </div>
    );
};

export default PersonalContacts;



const Contact = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    i {
        padding-right: 10px;
    } 
`
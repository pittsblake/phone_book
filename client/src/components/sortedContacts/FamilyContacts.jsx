import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const FamilyContacts = (props) => {
    return (
        <div className="contact">
            {
                props.contact.category === 'family' ? 
                <Contact>
                     <i className="fas fa-trash" onClick={() => { props.deleteContact(props.contact.id) }}></i>
                    <Link to={`/contacts/${props.contact.id}`}><h1>{props.contact.name}</h1></Link>
                </Contact>: null
            }
        </div>
    );
};

export default FamilyContacts;


const Contact = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 80%;

    i {
        padding-right: 10px;
    } 
`
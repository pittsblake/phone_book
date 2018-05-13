import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const WorkContacts = (props) => {
    return (
        <div className="contact">
            {
                props.contact.category === 'work' ? 
                <Contact>
                    <i className="fas fa-trash" onClick={() => { props.deleteContact(props.contact.id) }}></i>
                    <Link to={`/contacts/${props.contact.id}`}><h1>{props.contact.name}</h1></Link>
                </Contact>: null
            }
        </div>
    );
};

export default WorkContacts;

const Contact = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    i {
        padding-right: 10px;
    } 
`
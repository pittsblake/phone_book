import React from 'react';

const EditContact = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                    <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={props.handleChange}
                    />
                    <input 
                    type="text"
                    name="number"
                    placeholder="Phone Number"
                    onChange={props.handleChange}
                    />
                    <input 
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={props.handleChange}
                    />
                    <select name="category" onChange={props.handleChange}>
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="family">Family</option>
                    </select>
                    <button>Submit</button>
                </form>
        </div>
    );
};

export default EditContact;
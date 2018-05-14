import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components'


class SignUpLogIn extends Component {

    state = {
        email: '',
        password: '',
        password_confirmation: '',
        showSignUpForm: false,
        signIn: 'Sign In'
    }

    signUp = (event) => {
        event.preventDefault()
        this.props.signUp(
            this.state.email,
            this.state.password,
            this.state.password_confirmation
        )
    }

    signIn = (event) => {
        event.preventDefault()
        this.props.signIn(
            this.state.email,
            this.state.password
        )
    }

    handleChange = (event) => {
        const newState = { ...this.state }
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }


    toggleLogInForm = () => {
        if (this.state.showSignUpForm) {
            this.setState({
                showSignUpForm: !this.state.showSignUpForm,
            
            })
        }
        else if (this.state.showSignUpForm == false) {
            this.setState({
                showSignUpForm: !this.state.showSignUpForm,
               
            })
        }
    }

    render() {
        return (
            <MainContainer>


                <InnerContainer className="column">
                    <Title>Digits</Title>
                    <p className="tagline"> A place to keep connections</p>


                    {
                        this.state.showSignUpForm ?
                            <Card>
                                <CardHeader>
                                    <h1>Sign up</h1>
                                </CardHeader>
                                <FormContainer>

                                    <form className="column">
                                        <input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="Email" />

                                        <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="Password" />

                                        <input onChange={this.handleChange} type="password" name="password_confirmation"
                                            value={this.state.password_confirmation} placeholder="Confirm Password" />

                                        <CardButton onClick={this.signUp}>Submit</CardButton>

                                    </form>
                                    <div className="row-center">
                                        <p>Already a member?</p>
                                        <a href='#' onClick={this.toggleLogInForm}>Sign In</a>
                                    </div>
                                </FormContainer>
                            </Card>
                            :
                            <Card>
                                <CardHeader>
                                    <h1>Log In</h1>
                                </CardHeader>

                                <FormContainer>
                                    <form className="column">
                                        <input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="Email" />

                                        <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="Password" />


                                        <CardButton onClick={this.signIn}>Log in</CardButton>
                                    </form>
                                    <div className="row-center">
                                        <p>Not a member?</p>
                                        <a href='#' onClick={this.toggleLogInForm}> Sign Up</a>
                                    </div>
                                </FormContainer>
                            </Card>
                    }
                </InnerContainer>
            </MainContainer>
        )
    }
}

export default SignUpLogIn

const MainContainer = styled.div`
    height: 100%;
    width: 100vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-image: url("https://i.imgur.com/Gsvja0f.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 
`

const InnerContainer = styled.div`
    margin-right: 10vw;
`

const Title = styled.h1`
    font-size: 4em;
    margin-bottom: 0px;
    font-family: 'Jura', sans-serif;
    
`

const Card = styled.div`
    background-color: #c9e5e5;
    height: 50vh;
    width: 30vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    
    p{
        font-size: 13px;
        padding: 10px;
    }

    a{
        font-size: 13px;
    }

`

const CardHeader = styled.div`  
    display: flex;
    justify-content: center;
    width: 100%;
    height: 20%;
`

const CardButton = styled.button`
    width: 75%;
    display: block;
    margin-bottom: 10px;
    position: relative;
    text-align: center;
    font-size: 14px;
    font-family: 'Arial', sans-serif;
    font-weight: 700;
    height: 36px;
    padding: 0 8px;
    border: 0px;
    color: #fff;
    text-shadow: 0 1px rgba(0,0,0,0.1); 
    background-color: #4d90fe; 

    &&:hover{
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
    }
`

const FormContainer = styled.div`
    width: 90%;
`
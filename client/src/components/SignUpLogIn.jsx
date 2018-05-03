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

    // toggleSignUpForm = () => {
    //     this.setState({ 
    //         showSignUpForm: true,
    //         signIn: 'SignIn'
    //     })
    // }

    toggleLogInForm = () => {
        if (this.state.showSignUpForm) {
            this.setState({
                showSignUpForm: !this.state.showSignUpForm,
                // signIn: 'Sign Up'
            })
        }
        else if (this.state.showSignUpForm == false) {
            this.setState({
                showSignUpForm: !this.state.showSignUpForm,
                // signIn: 'Sign In'
            })
        }
    }

    render() {
        return (
            <MainContainer>


                <Card>



                    {
                        this.state.showSignUpForm ?
                            <div>

                                <button onClick={this.toggleLogInForm}>Sign In</button>

                                <form>
                                    <div>
                                        <label htmlFor="email">E-mail: </label>
                                        <input onChange={this.handleChange} type="text" name="email" value={this.state.email} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password: </label>
                                        <input onChange={this.handleChange} type="password" name="password" value={this.state.password} />
                                    </div>

                                    <div>
                                        <label htmlFor="password_confirmation">Confirm Password: </label>
                                        <input onChange={this.handleChange} type="password" name="password_confirmation"
                                            value={this.state.password_confirmation} />
                                    </div>


                                    <button onClick={this.signUp}>Submit</button>

                                </form>
                            </div>
                            :
                            <div>
                                <button onClick={this.toggleLogInForm}>Not a Member? Sign Up</button>
                                <form>
                                    <div>
                                        <label htmlFor="email">E-mail: </label>
                                        <input onChange={this.handleChange} type="text" name="email" value={this.state.email} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password: </label>
                                        <input onChange={this.handleChange} type="password" name="password" value={this.state.password} />
                                    </div>


                                    <button onClick={this.signIn}>Submit</button>
                                </form>
                            </div>
                    }
                </Card>
            </MainContainer>
        )
    }
}

export default SignUpLogIn

const MainContainer = styled.div`
    height: 90%;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center
`

const Card = styled.div`
    background-color: cyan;
    border-radius: 14px;
    height: 40vh;
    width: 30vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
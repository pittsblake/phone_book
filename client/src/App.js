import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import {clearAuthTokens, saveAuthTokens, setAxiosDefaults, userIsLoggedIn} from "./util/SessionHeaderUtil";
import SignUpLogIn from './components/SignUpLogIn'
import axios from 'axios';
import AllContacts from './components/AllContacts';
import ContactShowPage from './components/ContactShowPage';
import styled from 'styled-components'


class App extends Component {

  state = {
      signedIn: false,
  }

  async componentDidMount() {
    try {
      const signedIn = userIsLoggedIn()
      
      if (signedIn) {
        setAxiosDefaults()
      }

      this.setState({
        signedIn
      })
    } catch (error) {
      console.log(error)
    }
  }
  

  signUp = async (email, password, password_confirmation) => {
    try {
      const payload = {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
      const response = await axios.post('/auth', payload)
      saveAuthTokens(response.headers)

      this.setState({
        signedIn: true,
      })

    } catch (error) {
      console.log(error)
    }
  }

  signIn = async (email, password) => {
    try {
      const payload = {
        email,
        password
      }
      const response = await axios.post('/auth/sign_in', payload)
      saveAuthTokens(response.headers)

      this.setState({
        signedIn: true,
      })

    } catch (error) {
      console.log(error)
    }
  }

  signOut = async (event) => {
    try {
      event.preventDefault()

      await axios.delete('/auth/sign_out')

      clearAuthTokens();

      this.setState({ signedIn: false })
    } catch (error) {
      console.log(error)
    }
  }


  render() {

      const SignUpLogInComponent = () => {
          return <SignUpLogIn
              signUp={this.signUp}
              signIn={this.signIn}/>
      }

      const AllContactsComponent = () => {
        return <AllContacts />
    }

      const SingeContactComponent = (props) => {
          return <ContactShowPage {...props}/>
      }

      return (
          <Router>
              <AppContainer>
                <NavBar>
                  <button onClick={this.signOut}>Sign Out</button>
                </NavBar>
                  <Switch>
                      <Route exact path="/signUp" render={SignUpLogInComponent}/>
                      <Route exact path="/contacts" render={AllContactsComponent}/>
                      <Route exact path="/contacts/:id" render={SingeContactComponent} />
                  </Switch>

                  {this.state.signedIn ? <Redirect to="/contacts"/> : <Redirect to="/signUp"/>}
              </AppContainer>
          </Router>
      )
  }
}

export default App

const AppContainer = styled.div`
  height: 100vh
`

const NavBar = styled.div`
  height: 10%;
  width: 100vw;
`
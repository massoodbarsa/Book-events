import React, { Component } from 'react'
import './User.scss'
import AuthContext from '../components/authContext'


export default class User extends Component {

    state = {
        isLogin: true
    }
    constructor(props) {
        super(props)
        this.emailElement = React.createRef()
        this.passElement = React.createRef()
    }

    static contextType = AuthContext

    goToLoginHandler = () => {
        this.setState(prevState => {
            return { isLogin: !prevState.isLogin }
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        const email = this.emailElement.current.value
        const password = this.passElement.current.value

        if (email.trim().length === 0 || password.trim().length === 0) {
            return
        }

        let reqBody = {
            query: `
            query{
                login(email:"${email}", password:"${password}"){
                    userId 
                    token 
                    tokenExpiration   
                }
            }
            `
        }

        if (!this.state.isLogin) {
            reqBody = {
                query: `
                mutation{
                    createUser(userInput:{email:"${email}", password:"${password}"}){
                        _id  
                        email   
                    }
                }
                `
            }
        }

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('fetching failed')
                }
                return res.json()
            })
            .then(resData => {
                if (resData.data.login.token) {
                    this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.tokenExpiration)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <form className='user-form' onSubmit={this.submitHandler}>
                <div className='user-form__control'>
                    <label htmlFor="email">E-Mail</label>
                    <input type="email" id='email' ref={this.emailElement} />
                </div>
                <div className='user-form__control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' ref={this.passElement} />
                </div>
                <div className='user-form__actions'>
                    <button type='submit' >Submit</button>
                    <button type='button' onClick={this.goToLoginHandler}>Go to {this.state.isLogin ? 'Signup' : 'Login'}</button>
                </div>
            </form>
        )
    }
}

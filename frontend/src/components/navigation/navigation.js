import React from 'react'
import { NavLink } from 'react-router-dom'
import './navigation.scss'
import AuthContext from '../authContext'
import Logo from '../../assets/meteor-icon.svg'

const navigation = (props) => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className='navigation'>
                    <div className='navigation__logo'>
                    <img src={Logo} alt="React Logo" />

                    </div>
                    <div className='navigation__items'>
                        <ul>
                            {!context.token && <li><NavLink to='/users'>Log in</NavLink></li>}
                            <li><NavLink to='/events'>Events</NavLink></li>
                            {context.token && <li><NavLink to='/bookings'>Bookings</NavLink></li>}
                            {context.token && <li><button onClick={context.logout}>Sign Out</button></li>}
                        </ul>
                    </div>
                </header>
            )
        }}


    </AuthContext.Consumer>
)

export default navigation

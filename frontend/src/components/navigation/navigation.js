import React from 'react'
import { NavLink } from 'react-router-dom'
import './navigation.scss'
import AuthContext from '../authContext'

const navigation = (props) => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className='navigation'>
                    <div className='navigation__logo'>
                        <h1>Navbar</h1>
                    </div>
                    <div className='navigation__items'>
                        <ul>
                            {console.log(context.token)}
                            {!context.token && <li><NavLink to='/users'>Users</NavLink></li>}
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

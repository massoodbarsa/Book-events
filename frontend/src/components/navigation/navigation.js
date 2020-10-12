import React from 'react'
import { NavLink } from 'react-router-dom'
import './navigation.scss'

function navigation(props) {
    return (
        <header className='navigation'>
            <div className='navigation__logo'>
                <h1>Navbar</h1>

            </div>
            <div className='navigation__items'>
                <ul>
                    <li><NavLink to='/users'>Users</NavLink></li>
                    <li><NavLink to='/events'>Events</NavLink></li>
                    <li><NavLink to='/bookings'>Bookings</NavLink></li>
                </ul>
            </div>
        </header>
    )
}

export default navigation

import React from 'react'
import { NavLink } from 'react-router-dom'

function navigation(props) {
    return (
        <header>
            <div className='main-navigation__logo'>
                <h1>Navbar</h1>

            </div>
            <div className='main-navigation__items'>
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

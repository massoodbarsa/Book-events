import React from 'react'
import './bookingsList.scss'

export default function bookingsList(props) {
    return (
        <ul className='booking-list'>
            {props.bookings.map(booking => {
                return (
                    <li key={booking._id} className='booking-list__items'>
                        <div className='booking-list__data'> {booking.event.title} At {' '}
                            {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                        <div className='booking-list__action'>
                            <button onClick={props.onDelete.bind(this, booking._id)}>Cancel booking</button>
                        </div>
                    </li>)
            })
            }
        </ul>
    )
}

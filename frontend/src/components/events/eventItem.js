import React from 'react'
import './eventItem.scss'

export default function eventItem(props) {
    return (
        <div>
            <li key={props.eventId} className='events-list__item'>
                <div>
                    <h1>{props.title}</h1>
                    <h2>${props.price}</h2>
                </div>
                <div>
                    {props.userId === props.creatorId ? <p>You are the creator of this event</p> : <button>View Details</button>}
                </div>
            </li>
        </div>
    )
}

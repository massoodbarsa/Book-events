import React from 'react'
import './spinner.scss'

export default function spinner() {
    return (
        <div className='spinner'>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    )
}

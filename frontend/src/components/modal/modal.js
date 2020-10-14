import React from 'react'
import './modal.scss'

const modal = props => (

    <div className='modal'>
        <header className='modal__header'><h1>{props.title}</h1></header>
        <section className='modal__content'>
            {props.childeren}
        </section>
        <section className='modal__actions'>
            {props.isCancel && <button className='modal__btn' onClick={props.onCancel}>Cancel</button>}
            {props.isConfirm && <button className='modal__btn' onClick={props.onConfirm}>Conform</button>}
        </section>
    </div>

)

export default modal
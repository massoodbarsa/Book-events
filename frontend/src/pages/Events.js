import React, { Component } from 'react'
import './Events.scss'
import Modal from '../components/modal/modal'
import FadeBackground from '../components/modal/fadeBackground'

export default class Events extends Component {
    state = {
        created: false
    }

    createEventHandler = () => {
        this.setState({
            created: true
        })
    }
    modalCancelHandler = () => {
        this.setState({
            created: false
        })
    }
    modalConfirmHandler = () => {
        this.setState({
            created: false
        })
    }
    render() {
        return (
            <React.Fragment>
                {this.state.created && <FadeBackground />}
                { this.state.created && <Modal title='Add Event' isCancel isConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
                    <p>model content</p>
                </Modal>}
                <div className='events'>
                    <button className='creatEvent-btn' onClick={this.createEventHandler}>Create Event</button>
                </div>
            </React.Fragment>
        )
    }
}

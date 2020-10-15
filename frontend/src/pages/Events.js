import React, { Component } from 'react'
import './Events.scss'
import Modal from '../components/modal/modal'
import FadeBackground from '../components/modal/fadeBackground'
import AuthContext from '../components/authContext'


export default class Events extends Component {
    state = {
        created: false,
        events: []

    }

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.titleRef = React.createRef()
        this.priceRef = React.createRef()
        this.dateRef = React.createRef()
        this.descriptionRef = React.createRef()

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
        const title = this.titleRef.current.value
        const price = this.priceRef.current.value
        const date = this.dateRef.current.value
        const description = this.descriptionRef.current.value

        if (title.trim().length === 0 || price <= 0 || date.trim().length === 0 || description.trim().length === 0) {
            return
        }

        const event = { title, price, date, description }

        const reqBody = {
            query: `
                mutation {
                  createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
                    _id
                    title
                    description
                    date
                    price
                    creator {
                      _id
                      email
                    }
                  }
                }
              `
        };
        const token = this.context.token

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('fetching failed kopak')
                }
                return res.json()
            })
            .then(resData => {
                this.fetchEvents()
            })
            .catch(err => {
                console.log(err);
            })
    }

    fetchEvents = () => {
        const reqBody = {
            query: `
            query  {
                events {
                    _id
                    title
                    description
                    date
                    price
                    creator {
                      _id
                      email
                    }
                  }
                }
              `
        };

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('fetching failed kopak')
                }
                return res.json()
            })
            .then(resData => {
                const events = resData.data.events
                this.setState({ events })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.fetchEvents()
    }

    render() {
        const eventsList = this.state.events.map(event => {
            return (
                <li key={event._id} className='events-list__item'>{event.title}</li>
            )
        })
        return (
            <React.Fragment>
                {this.state.created && <FadeBackground />}
                { this.state.created && <Modal
                    title='Add Event'
                    isCancel
                    isConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.modalConfirmHandler}
                >
                    <form >
                        <div className='form-control'>
                            <label htmlFor="title">Title</label>
                            <input type="text" id='title' ref={this.titleRef} />
                        </div>
                        <div className='form-control'>
                            <label htmlFor="price">Price</label>
                            <input type="number" id='price' ref={this.priceRef} />
                        </div>
                        <div className='form-control'>
                            <label htmlFor="date">Date</label>
                            <input type="datetime-local" id='date' ref={this.dateRef} />
                        </div>
                        <div className='form-control'>
                            <label htmlFor="description">Description</label>
                            <textarea rows='4' id='description' ref={this.descriptionRef} />
                        </div>
                    </form>
                </Modal>}
                {this.context.token && <div className='events'>
                    <button className='creatEvent-btn' onClick={this.createEventHandler}>Create Event</button>
                </div>}
                <ul className='events-list'>
                    {eventsList}
                </ul>
            </React.Fragment>
        )
    }
}

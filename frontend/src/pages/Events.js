import React, { Component } from 'react'
import './Events.scss'
import Modal from '../components/modal/modal'
import FadeBackground from '../components/modal/fadeBackground'
import AuthContext from '../components/authContext'
import EventList from '../components/events/eventList'
import Spinner from '../components/spinner/spinner'

export default class Events extends Component {
    state = {
        created: false,
        events: [],
        loading: false,
        selectedEvent: null
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
            created: false,
            selectedEvent: null
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


        const reqBody = {
            query: `
                mutation {
                  createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
                    _id
                    title
                    description
                    date
                    price
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
                this.setState(prevState => {
                    const updatedEvents = [...prevState.events]
                    updatedEvents.push({
                        _id: resData.data.createEvent._id,
                        title: resData.data.createEvent.title,
                        description: resData.data.createEvent.description,
                        date: resData.data.createEvent.date,
                        price: resData.data.createEvent.price,
                        creator: {
                            _id: this.context.userId,
                        }
                    })
                    return { events: updatedEvents }

                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    fetchEvents = () => {
        this.setState({
            loading: true
        })
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
                this.setState({ events, loading: false })
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false })

            })
    }

    componentDidMount() {
        this.fetchEvents()
    }

    showDetailHandler = eventId => {
        this.setState(prevState => {
            const selectedEvent = prevState.events.find(e => e._id === eventId)
            return { selectedEvent: selectedEvent }
        })
    }

    bookEventHandler = () => {

    }


    render() {
        return (
            <React.Fragment>
                {(this.state.created || this.state.selectedEvent) && <FadeBackground />}
                { this.state.created && <Modal
                    title='Add Event'
                    isCancel
                    isConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.modalConfirmHandler}
                    confirmText='Confirm'
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

                {this.state.selectedEvent && (
                    <Modal
                        title={this.state.selectedEvent.title}
                        isCancel
                        isConfirm
                        onCancel={this.modalCancelHandler}
                        onConfirm={this.bookEventHandler}
                        confirmText='Book'

                    >
                        <h1>{this.state.selectedEvent.title}</h1>
                        <h2>${this.state.selectedEvent.price}</h2>
                        <p>{this.state.selectedEvent.description}</p>
                        <p>{new Date(this.state.selectedEvent.date).toLocaleDateString()}</p>

                    </Modal>
                )}

                {this.context.token && <div className='events'>
                    <button className='creatEvent-btn' onClick={this.createEventHandler}>Create Event</button>
                </div>}
                {this.state.loading
                    ? <Spinner />
                    : <EventList
                        events={this.state.events}
                        authUserId={this.context.userId}
                        onViewDetail={this.showDetailHandler}
                    />}

            </React.Fragment>
        )
    }
}

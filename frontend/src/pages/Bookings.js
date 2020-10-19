import React, { Component } from 'react'
import AuthContext from '../components/authContext'
import Spinner from '../components/spinner/spinner'
import './bookings.scss'
import BookingsList from '../components/bookings/bookingsList'

export default class Bookings extends Component {

    state = {
        isLoading: false,
        bookings: []

    }
    static contextType = AuthContext


    fetchBookings = () => {
        this.setState({ isLoading: true });
        const requestBody = {
            query: `
          query {
            bookings {
              _id
             createdAt
             event {
               _id
               title
               date
             }
            }
          }
        `
        };

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.context.token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }

                return res.json();
            })
            .then(resData => {
                const bookings = resData.data.bookings;
                this.setState({ bookings: bookings, isLoading: false })
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false });
            });
    }

    componentDidMount() {
        this.fetchBookings()
    }

    handleDeleteBooking = bookingId => {
        this.setState({ isLoading: true });
        const requestBody = {
            query: `
          mutation {
            cancelBooking(bookingId:"${bookingId}") {
              _id
              title
            }
          }
        `
        };

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.context.token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }

                return res.json();
            })
            .then(resData => {

                this.setState(prevState => {
                    const updatedBookings = prevState.bookings.filter(booking => {
                        return booking._id !== bookingId
                    })
                    return { bookings: updatedBookings, isLoading: false }

                })
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false });
            });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.isLoading ? (
                    <Spinner />
                ) : (
                        <BookingsList bookings={this.state.bookings} onDelete={this.handleDeleteBooking} />
                    )}
            </React.Fragment>
        )
    }
}

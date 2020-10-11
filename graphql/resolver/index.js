const userResover = require('./users')
const eventResover = require('./events')
const bookingResover = require('./bookings')

const rootResolver = {
    ...userResover,
    ...bookingResover,
    ...eventResover
}

module.exports = rootResolver
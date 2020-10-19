const Booking = require('../../models/booking');
const Event = require('../../models/event');
const {
    bookingCoreObj,
    eventCoreObj
} = require('./commonObj')


module.exports = {

    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('not authenticated')
        }

        try {
            const bookings = await Booking.find({
                user: req.userId
            });
            return bookings.map(booking => {
                return bookingCoreObj(booking)
            });
        } catch (err) {
            throw err;
        }
    },


    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('not authenticated')
        }

        const fetchedEvent = await Event.findOne({
            _id: args.eventId
        });
        const booking = new Booking({
            user: req.userId,
            event: fetchedEvent
        });
        const result = await booking.save();
        return bookingCoreObj(result)

    },
    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('not authenticated')
        }

        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = eventCoreObj(booking.event)
            await Booking.deleteOne({
                _id: args.bookingId
            });
            return event;
        } catch (err) {
            throw err;
        }
    }
};
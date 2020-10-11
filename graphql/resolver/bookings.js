const Booking = require('../../models/booking');
const Event = require('../../models/event');
const {
    bookingCoreObj,
    eventCoreObj
} = require('./commonObj')


module.exports = {

    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                bookingCoreObj(booking)
            });
        } catch (err) {
            throw err;
        }
    },


    bookEvent: async args => {
        const fetchedEvent = await Event.findOne({
            _id: args.eventId
        });
        const booking = new Booking({
            user: '5f73a65f712527081c0f328d',
            event: fetchedEvent
        });
        const result = await booking.save();
        return bookingCoreObj(result)

    },
    cancelBooking: async args => {
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
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const reservationSchema = new mongoose.Schema({
  show_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  reserved: {
    type: Boolean,
    default: False
  },
  contact:{
    type: Number,
    required: True
  }
});

reservationSchema.plugin(AutoIncrement, { inc_field: '_id' });

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;

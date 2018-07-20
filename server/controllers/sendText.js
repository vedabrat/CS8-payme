require('dotenv').load();

// const twilio = require('twilio');
// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_TOKEN;

const moment = require('moment');
const momentTimeZone = require('moment-timezone');
const Reminder = require('../models/Reminder');

const getTimeZones = function() {
  return momentTimeZone.tz.names();
};

// POST: /api/sms create a reminder
const createReminder = (req, res) => {
  const { name, phoneNumber, message, notification, timeZone } = req.body;
  // const time = moment(req.body.time, 'MM-DD-YYYY hh:mma');
  const reminder = new Reminder({
    name: name,
    phoneNumber: phoneNumber,
    message: message,
    notification: notification,
    timeZone: timeZone,
    // time: time
  });
  reminder
    .save()
    .then(reminder => {
      res.redirect('/');
      // res.json(reminder);
      // console.log(reminder);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error couldnt send' });
    });
};
// GET: /api/sms/:id
// if reminder was deleted, it will redirect back
const getReminder = (req, res) => {
  const { id } = req.params;
  Reminder.findOne({ _id: id })
    .then(reminder => {
      if (reminder) {
        res.json(reminder);
      }
      res.redirect('/');
      console.log('this was deleted');
    })
    .catch(err => {
      res.status(500).json(err);
      // console.log(err);
    });
};
// POST: /api/sms/:id
// deletes reminder and redirects back to create
const deleteReminder = (req, res) => {
  const { id } = req.params;

  Reminder.remove({ _id: id })
    .then(reminder => {
      // res.json(reminder);
      res.redirect('/');
      console.log('deleted');
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

module.exports = {
  getReminder,
  createReminder,
  deleteReminder,
};

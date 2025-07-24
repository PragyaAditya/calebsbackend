
const Place = require('../models/placemodel'); // make sure the path/name is correct
const mongoose = require('mongoose');

exports.createBulkPlaces = async (req, res) => {
  try {
    console.log('REQ BODY =>', req.body);              // <— log it
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Body must be an array' });
    }

    const created = await Place.insertMany(req.body, { ordered: false });
    return res.status(201).json({ message: 'ok', data: created });

  } catch (error) {
    console.error('Bulk insert error:', error);        // <— print full error to console
    return res.status(500).json({
      error: 'Server error',
      message: error.message,                          // <— temporarily expose for debugging
      code: error.code,
      name: error.name
    });
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const { state } = req.query;

    let filter = {};
    if (state) {
      // Case-insensitive match
      filter.state = new RegExp(`^${state}$`, 'i');
    }

    const places = await Place.find(filter);
    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


import express from 'express';

const apiroutes = express.Router();
apiroutes.use('/item', require('./item.js'));

module.exports=apiroutes
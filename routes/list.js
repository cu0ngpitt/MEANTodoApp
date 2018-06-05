const express = require('express');
const router = express.Router();
const config = require('../config/database');
const List = require('../models/list');


//get all items in to do list
router.get('/lists', (req, res, next) => {
  List.getLists((err, todos) => {
    if(err) {
      res.json({success: false, msg: 'No list found'});
    } else {
      res.json({
        success: true,
        todos
      });
    }
  });
});

//add new item
router.post('/add', (req, res, next) => {
  const username = req.body.username;
  const name = "''" + username + "''";
  console.log(name);
  const newItem = new List({
    item: req.body.item,
    completed: false
  }, {collection: name});

  List.addItem(newItem, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to add item'});
    } else {
      res.json({success: true, msg: 'New item successfully added'});
    }
  })
});

//mark item completed
router.post('/completed', (req, res, next) => {
  const idNum = req.body._id;

  List.markItemCompleted(idNum, (err, todos) => {
    if(err) {
      res.json({success: false, msg: 'Failed to update the to do item'});
    } else {
      res.json({success: true, msg: 'Item completed, updated successfully'});
    }
  });
});

//mark item not completed
router.post('/notcompleted', (req, res, next) => {
  const idNum = req.body._id;

  List.markNotCompleted(idNum, (err, todos) => {
    if(err) {
      res.json({success: false, msg: 'Failed to update the to do item'});
    } else {
      res.json({success: true, msg: 'Item NOT completed, updated successfully'});
    }
  });
});

//delete completed items
router.delete('/delete', (req, res, next) => {
  List.deleteCompleted((err, todos) => {
    if(err) {
      res.json({success: false, msg: 'Failed to delete completed items'});
    } else {
      res.json({success: true, msg: 'Completed items successfully deleted'});
    }
  });
});


module.exports = router;

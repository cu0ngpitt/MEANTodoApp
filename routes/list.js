const express = require('express');
const router = express.Router();
const config = require('../config/database');
const List = require('../models/list');


//get all items in the to do list
router.post('/lists', (req, res, next) => {
  const username = req.body.username;
  List.getListByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, msg: 'No list found for this user', data: { todos: [] }
    });
    } else {
      List.getLists(username, (err, data) => {
        if(err) {
          res.json({ success: false, msg: 'No list found', data: { todos: [] }
        });
        } else {
          res.json({ success: true, msg: 'Success! List has been sent', data });
        }
      });
    }
  })
});

//add new item
router.post('/add', (req, res, next) => {
  const username = req.body.username;
  const item = {todos: [{
    item: req.body.todos[0].item,
    completed: false
  }]};
  const newItem = new List({
    username: req.body.username,
    todos: [{
      item: req.body.todos[0].item,
      completed: false
    }]
  });

  List.getListByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      List.addNewItem(newItem, (err, user) => {
        if(err) {
          res.json({success: false, msg: 'Failed to add new item'});
        } else {
          res.json({success: true, msg: 'New item successfully added'});
        }
      })
    } else {
      List.addItem(username, item, (err, todos) => {
        if(err) {
          res.json({success: false, msg: 'Failed to push new item'});
        } else {
          res.json({success: true, msg: 'New item successfully pushed'});
        }
      })
    }
  });

});

//mark item completed
router.post('/completed', (req, res, next) => {
  const idNum = req.body.list[0]._id;
  const userId = req.body.userId;

  List.markItemCompleted(idNum, userId, (err, todos) => {
    if(err) {
      res.json({success: false, msg: 'Failed to update the to do item'});
    } else {
      res.json({success: true, msg: 'Item completed, updated successfully'});
    }
  });
});

//mark item not completed
router.post('/notcompleted', (req, res, next) => {
  const idNum = req.body.list[0]._id;
  const userId = req.body.userId;

  List.markNotCompleted(idNum, userId, (err, todos) => {
    if(err) {
      res.json({success: false, msg: 'Failed to update the to do item'});
    } else {
      res.json({success: true, msg: 'Item NOT completed, updated successfully'});
    }
  });
});

//delete completed items
router.post('/delete', (req, res, next) => {
  const userId = req.body.userId;

  List.deleteCompleted(userId, (err, todos) => {
    if(err) {
      res.json({success: false, msg: 'Failed to delete completed items'});
    } else {
      res.json({success: true, msg: 'Completed items successfully deleted'});
    }
  });
});


module.exports = router;

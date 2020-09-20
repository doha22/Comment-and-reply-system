var express = require("express");
//const router = express.Router();
var mongoose = require('mongoose');
let Message = require('../Models/message');
let Reply = require('../Models/replies');
const auth = require('../Middleware/auth')


////////////// create message ///////////////////////////
exports.message = async (req, res) => {
    Message.create(req.body).then(result => {
        res.status(201).json({
            message: " successfully posted",
                data:{ result
            }
        });
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    });

}


///////////////// get all messages ////////////////////


    exports.allMsgs = async (req, res) => {
        Message.find({})
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    })

}
 

//////////////// relpies //////////////////////////

exports.replies = async (req, res) => {
    Reply.create(req.body)
    .then(function(result) {
    
      return Message.findOneAndUpdate({ _id: req.params.id }, {$push: {replies: result._id}}, { new: true });
    })
    .then(function(com) {
      res.json(com);
    })
    .catch(function(err) {
      // If an error occurred, send it to the user
      res.json(err);
    });
}


///////////////////// get replies related to message id //////////////


    exports.getReplies = async (req, res) => {
    Message.findOne({ _id: req.params.id })
      .populate("replies", "-_id -__v")
      .then(function(result) {
        res.json(result);
        console.log(result)
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });

    }

  ///////////////////////// delete comment///////////////

  exports.deleteMsg = async (req, res) => {
  Message.findByIdAndRemove(req.params.id)
  .then(function(result) {
    res.json({result
    , message:"deleted successfully "});
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
  });
     
}


///////////////////////// update comment //////////////////

  
    exports.updateMsg = async (req, res) => {
    Message.findById(req.params.id, function (err, result) {
    if (!result)
    return (new Error('Unable To Find  Id'));
    else {
    result.message = req.body.message;
    result.save().then(emp => {
    res.json('Updated Successfully');
    })
    .catch(err => {
    res.status(400).send("Unable To Update");
    });
    }
    });
    }
    
  







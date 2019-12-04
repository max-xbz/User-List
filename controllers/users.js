const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    //pagination
    let num = 7;
    let pageNum = (parseInt(req.query.page) - 1) * num;
    if(pageNum < 0) {
        pageNum = 0;
    }
    //search info
    let searchInfo = {};
    if(req.query.term) {
        //console.log("this is search api");
        let content = req.query.term;
        let isNum = /^\d+$/.test(content);
        let age = isNum? parseInt(content): "";
        let searchItems = [
            {firstName: {$regex : `.*${content}.*`, $options: 'i'}}, 
            {lastName: {$regex : `.*${content}.*`, $options: 'i'}}, 
            {sex: {$regex : `.*${content}.*`, $options: 'i'}}
        ];
        if(age !== "") {
            searchItems.push({age: age});
        }
        searchInfo = {$or: searchItems};
    }
    //sort info
    let sortInfo = { createdAt: -1 };
    if(req.query.sort_by) {
        sortInfo = { [req.query.sort_by]: parseInt(req.query.order)};
    }
    //Model.find(filter, [projection], [options], [callback])
    User.find(searchInfo)
        .sort(sortInfo)
        .skip(pageNum)
        .limit(num)
        .then((docs)=>{
            if(docs.length === 0) {
                res.status(204).json("Sorry no results");
            } else {
                res.status(200).json(docs);
            }
        })
        .catch((err)=>{
            //error handle
            res.json(err);
        });
});
router.get('/:id', (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, docs) => {
        if(err) res.json(err);
        else res.json(docs);
    });
});
router.post('/', (req, res) => {
    let user = req.body;
    let age = 0;
    if(!isNaN(parseInt(user.age))) {
        age = parseInt(user.age);
    }
    let createUser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        sex: user.sex,
        age: age,
        password: user.password,
        createdAt: new Date()
    });
    createUser.save((err) => {
        if(err) {
            res.status(406).json(err);
        } else {
            //if save succeeded, return user's _id
            res.status(201).json(createUser._id);
        }
    });
});
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    User.findOneAndDelete({_id: id}, (err, docs) => {
        if(err) {
            res.json(err);
        } else {
            res.status(200).json("delete success");
        }
    });
});
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let updateInfo = req.body;
    User.findById(id, (err, docs) => {
        if(err) {
            console.log(err);
        } else {
            if(updateInfo.firstName) {
                docs.firstName = updateInfo.firstName;
            }
            if(updateInfo.lastName) {
                docs.lastName = updateInfo.lastName;
            }
            if(updateInfo.sex) {
                docs.sex = updateInfo.sex;
            }
            if(updateInfo.age) {
                docs.age = updateInfo.age;
            }
            if(updateInfo.password) {
                docs.password = updateInfo.password;
            }
            docs.save((err) => {
                if(err) res.status(406).json(err);
                else res.status(200).json(docs);
            });
        }
    });
});

module.exports = router;

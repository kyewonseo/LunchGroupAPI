var express = require('express');
var router = express.Router();
var ResCode = require('../utils/ResCode');
var SendRes = require('../utils/SendRes');
var db = require('../utils/db');
var Group = require('../libs/group');
var Person = require('../libs/person');
var util = require('../utils/util');

router.get('/', function (req, res, next) {

    db.connectDB()
        .then(() => Group.getAll())
        .then((result) => {
            console.log('result=>', result);
            SendRes.send(res, ResCode.SUCCESS, {data: result});

        }).catch((err) => {
        SendRes.send(res, ResCode.INTERNALSERVERERROR, err);
    })
});

router.post('/', function (req, res, next) {

    let data = req.body;
    let minSizeGroup;   //그룹당 최소 사람 수
    let numberOfGroup; //그룹의 수

    if(req.query.minSizeGroup == undefined) minSizeGroup = req.query.minSizeGroup ? minSizeGroup : 2;
    if(req.query.numberOfGroup == undefined) numberOfGroup = req.query.numberOfGroup ? numberOfGroup : 3;

    /**
     * 1.전체 유저를 가져올때 섞어서 가져온다.
     * 2.그룹의 수만큼 그룹당 최소 유저를 채운다.
     * 3.남은 유저그룹을 그룹의 수의 랜덤값 번호로 할당해준다.
     * **/

    db.connectDB()
        .then(() => Person.getAll())
        .then((result) => {
            // console.log('result=>', result);
            let personData = result;
            let persons = util.shuffle(personData);

            let group = [];
            let remainGroup = [];
            let subGroup = [];

            persons.forEach(function (person, index, array) {
                if (subGroup.length < minSizeGroup && group.length < numberOfGroup) {
                    subGroup.push(person);
                } else {
                    if (subGroup.length >= minSizeGroup) {
                        group.push({"persons":subGroup});
                        subGroup = [];
                    }
                    remainGroup.push(person);
                }
            })

            remainGroup.forEach(function (person, index, array) {
                let remainGroupIndex = Math.floor(Math.random() * numberOfGroup);
                group[remainGroupIndex].persons.push(person)
            })

            console.log('group=>', group)
            // SendRes.send(res, ResCode.SUCCESS, {data: group});

            Group.insertBulk(group)
                .then((result) => {
                    console.log('result=>', result);
                    SendRes.send(res, ResCode.SUCCESS, {data: result});

                }).catch((err) => {
                SendRes.send(res, ResCode.INTERNALSERVERERROR, err);
            })

        }).catch((err) => {
        SendRes.send(res, ResCode.INTERNALSERVERERROR, err);
    })
});

router.get('/id/:groupId', function (req, res, next) {

    let groupId = req.params.groupId;

    db.connectDB()
        .then(() => Group.getGroupById(groupId))
        .then((result) => {
            SendRes.send(res, ResCode.SUCCESS, {data: result});

        }).catch((err) => {
        if (err.name == 'CastError') {
            console.log('in')
            let message = "Check group id!";
            SendRes.send(res, ResCode.FAIL, {message: message});
        } else {
            let message = err;
            SendRes.send(res, ResCode.INTERNALSERVERERROR, {message: message});
        }
    })

});

router.get('/name/:name', function (req, res, next) {

    let name = req.params.name;

    db.connectDB()
        .then(() => Group.getGroupByName(name))
        .then((result) => {
            console.log('result=>', result);

            if (result == null) {
                let message = "Check group name!";
                SendRes.send(res, ResCode.FAIL, {message: message});
            } else {
                SendRes.send(res, ResCode.SUCCESS, {data: result});
            }

        }).catch((err) => {
        let message = err;
        SendRes.send(res, ResCode.INTERNALSERVERERROR, {message: message});
    })
});

router.delete('/id/:groupId', function (req, res, next) {

    let groupId = req.params.groupId;

    db.connectDB()
        .then(() => Group.deleteGroupById(groupId))
        .then((result) => {
            console.log('result=>', result);

            if (result.deletedCount == 0) {
                let message = "can't find group";
                SendRes.send(res, ResCode.FAIL, {message: message});
            } else {
                SendRes.send(res, ResCode.SUCCESS, {data: result});
            }
        }).catch((err) => {
        let message = err;
        SendRes.send(res, ResCode.INTERNALSERVERERROR, {message: message});
    })
});

router.delete('/name/:name', function (req, res, next) {

    let name = req.params.name;

    db.connectDB()
        .then(() => Group.deleteGroupByName(name))
        .then((result) => {
            console.log('result=>', result);

            if (result.deletedCount == 0) {
                let message = "can't find group";
                SendRes.send(res, ResCode.FAIL, {message: message});
            } else {
                SendRes.send(res, ResCode.SUCCESS, {data: result});
            }
        }).catch((err) => {
        let message = err;
        SendRes.send(res, ResCode.INTERNALSERVERERROR, {message: message});
    })
});

module.exports = router;

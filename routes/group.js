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
    let minSizeGroup = 2;   //그룹당 최소 사람 수
    let numberOfGroup = 3; //그룹의 수

    if (req.query.minSizeGroup != undefined) minSizeGroup = Number(req.query.minSizeGroup);
    if (req.query.numberOfGroup != undefined) numberOfGroup = Number(req.query.numberOfGroup);

    /**
     * 1.전체 유저를 가져올때 섞어서 가져온다.
     * 2.그룹의 수만큼 그룹당 최소 유저를 채운다.
     * 3.남은 유저그룹을 그룹의 수의 랜덤값 번호로 할당해준다.
     * **/

    db.connectDB()
        .then(() => Person.getAll())
        .then((result) => {
            if (result.length < minSizeGroup * numberOfGroup) {
                let message = "Check group count!";
                SendRes.send(res, ResCode.FAIL, {message: message});
            } else {

                let personData = result;
                let persons = util.shuffle(personData);

                let group = [];
                let remainGroup = [];
                let subGroup = [];

                persons.forEach(function (person, index, array) {

                    if (group.length < numberOfGroup) {
                        subGroup.push(person);
                        if (subGroup.length % minSizeGroup == 0) {
                            group.push({"persons": subGroup});
                            subGroup = [];
                        }
                    } else {
                        remainGroup.push(person);
                    }
                })

                remainGroup.forEach(function (person, index, array) {
                    let remainGroupIndex = Math.floor(Math.random() * numberOfGroup);
                    group[remainGroupIndex].persons.push(person)
                })

                Group.deleteGroupAll()
                    .then((result) => {
                        // console.log('result=>', result);
                        Group.insertBulk(group)
                            .then((result) => {
                                console.log('result=>', result);
                                SendRes.send(res, ResCode.SUCCESS, {data: result});

                            }).catch((err) => {
                            SendRes.send(res, ResCode.INTERNALSERVERERROR, err);
                        })
                    }).catch((err) => {
                    SendRes.send(res, ResCode.INTERNALSERVERERROR, err);
                });
            }
        }).catch((err) => {
        SendRes.send(res, ResCode.INTERNALSERVERERROR, err);
    })
});

module.exports = router;

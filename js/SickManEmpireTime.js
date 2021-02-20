/*!
 * SickManEmpireTime 1.0.0
 * https://github.com/sunny00217wm/SickManEmpireTime
 *
 * Copyright 2021 sunny00217wm
 * Released under the GPLv3
 */
var SickManEmpireTime = function () {
    "use strict";
    var SickManEmpireTimeObj = {};
    var EmpireFirst = SickManEmpireTimeObj.EmpireFirst = new Date('2019-7-4 16:00:00 GMT');
    var getYear = SickManEmpireTimeObj.getYear = function (date) {
        var time = new Date(date || Date.now()), count;
        if (time.toString() == "Invalid Date") {
            throw new TypeError('Couldn\'t parse argument date.');
        }
        count = (time.getTime() - EmpireFirst.getTime()) / (12 * 60 * 60 * 1000);
        if (time.getUTCHours() === 4 || time.getUTCHours() === 16) {
            count = count - 1;
        }
        if (time > EmpireFirst) {
            return Math.floor(count) + 1;
        }
        else {
            return Math.ceil(count) + 1;
        }
    };
    var getMonth = SickManEmpireTimeObj.getMonth = function (date) {
        var time = new Date(date || Date.now()), count;
        if (time.toString() == "Invalid Date") {
            throw new TypeError('Couldn\'t parse argument date.');
        }
        count = time.getUTCHours();
        if (count > 12) {
            return count - 12;
        }
        else if (count == 0) {
            return 12;
        }
        else {
            return count;
        }
    };
    var SickManEmpireTime = function (date) {
        return new SickManEmpireTime.prototype.init(date);
    };
    SickManEmpireTime.prototype = {
        init: function (date) {
            var time = new Date(date || Date.now());
            if (time.toString() == "Invalid Date") {
                throw new TypeError('Couldn\'t parse argument date.');
            }
            this.time = time;
        },
        getThisYear: function () {
            return getYear(this.time);
        },
        getThisMonth: function () {
            return getMonth(this.time);
        }
    };
    SickManEmpireTime.prototype.init.prototype = SickManEmpireTime.prototype;
    for (var $key in SickManEmpireTimeObj) {
        SickManEmpireTime[$key] = SickManEmpireTimeObj[$key];
    }
    return SickManEmpireTime;
}();

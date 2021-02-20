var SickManEmpireTimeObj = {};

var EmpireFirst = SickManEmpireTimeObj.EmpireFirst = new Date('2019-7-4 16:00:00 GMT');

var getYear = SickManEmpireTimeObj.getYear = function (date) {
	var time = new Date(date || Date.now()), count;
	if (time.toString() == "Invalid Date") {
		throw new TypeError('Couldn\'t parse argument date.');
	}
	count = (time.getTime() - EmpireFirst.getTime()) / (12 * 60 * 60 * 1000);
	if (time > EmpireFirst) {
		return Math.floor(count) + 1;
	}
	else {
		return Math.ceil(count) + 1;
	}
};

function add_leading_zero (number) {
	return number < 10 ? '0' + number : number;
}

var FromYearGetBaseTime = SickManEmpireTimeObj.FromYearGetBaseTime = function ( year, utc ) {
	if ( typeof year !== 'number' && isNaN( year ) ) {
		throw new TypeError('Couldn\'t parse argument year.');
	}
	var BaseTime = new Date( EmpireFirst.getTime() + ( ( year - 1 ) * 12 * 60 * 60 * 1000 ) + 60 * 60 * 1000 );
	if ( utc ) { // 取得UTC時間，有原生方法可以用
		return BaseTime.getUTCFullYear() + '-' + add_leading_zero( BaseTime.getUTCMonth() + 1 ) + '-' + add_leading_zero( BaseTime.getUTCDate() ) + ' ' + add_leading_zero(BaseTime.getUTCHours()) + ':00 (UTC)';
	} else { // 檢測時區是不是+8區
		var utc_offset = -1 * new Date().getTimezoneOffset() / 60;
		if ( utc_offset === 8 ) { // 是，有原生方法可以用
			return BaseTime.getFullYear() + '-' + add_leading_zero( BaseTime.getMonth() + 1 ) + '-' + add_leading_zero( BaseTime.getDate() ) + ' ' + add_leading_zero(BaseTime.getHours()) + ':00 (UTC+8)';
		} else { // 把UTC時間指定為+8區時間，再輸出
			BaseTime = new Date( BaseTime.getTime() + 8 * 60 * 60 * 1000 );
			return BaseTime.getUTCFullYear() + '-' + add_leading_zero( BaseTime.getUTCMonth() + 1 ) + '-' + add_leading_zero( BaseTime.getUTCDate() ) + ' ' + add_leading_zero(BaseTime.getUTCHours()) + ':00 (UTC+8)';
		}
	}
};

var getMonth = SickManEmpireTimeObj.getMonth = function (date) {
	var time = new Date(date || Date.now()), count;
	if (time.toString() == "Invalid Date") {
		throw new TypeError('Couldn\'t parse argument date.');
	}
	count = time.getUTCHours();
	if (count > 15) {
		return count - 15;
	}
	else if (count <= 3) {
		return count + 9;
	}
	else {
		return count - 3;
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

var getResult = function ( argYear, argDate, utc ) {
	var date = new Date( '2019-07-04T16:00:00+00:00' ), $ret = [ { 'earth': utc ? "2019-07-04 09:00 (UTC)" : "2019-07-04 13:00 (UTC+8)", 'year': 0 } ];
	var Year = argDate ? getYear( argDate ) : argYear || getYear() ;
	for ( var year = 1; year <= Year; year++ ) {
		$ret[ year ] = {
			'earth': FromYearGetBaseTime(year, utc),
			'year': year
		};
		date.setTime( date.getTime() + 12 * 1000 * 60 * 60 );
	}
	return $ret;
};

var toTxt = function ( argYear, argDate, utc ) {
	var $ret = '', result = getResult( argYear, argDate, utc );
	for ( var i = 0; i < result.length; i++ ) {
		$ret += 'earth: ' + result[ i ].earth + ', year: ' + result[ i ].year + '\n';
	}
	return $ret;
};

SickManEmpireTimeObj.table = {
	toConsole: function ( argYear, argDate, utc ) {
		console.table( getResult( argYear, argDate, utc ) );
	},
	toTxt: toTxt
};

for (var $key in SickManEmpireTimeObj) {
	SickManEmpireTime[$key] = SickManEmpireTimeObj[$key];
}
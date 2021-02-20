<?php
/*!
 * SickManEmpireTime 1.0.0
 * https://github.com/sunny00217wm/SickManEmpireTime
 *
 * Copyright 2021 sunny00217wm
 * Released under the GPLv3
 */
date_default_timezone_set( 'Asia/Taipei' );

class SickManEmpireTimeObj {
	protected $EmpireFirst = 1562256000; // 2019-7-4 16:00:00 GMT
	public function getYear ( int $timestamp ) {
		$timestamp = $timestamp || time();
		$count = ( $timestamp - $this->$EmpireFirst ) / (12 * 60 * 60 * 1000);
		if ( $count > 0 ) {
			return floor( $count ) + 1;
		}
		else {
			return ceil( $count ) + 1;
		}
	}

	public function FromYearGetBaseTime ( int $year, bool $utc ) {
		$BaseTime = $this->$EmpireFirst + ( ( $year - 1 ) * 12 * 60 * 60 * 1000 ) + 60 * 60 * 1000;
		if ( $utc ) {
			return date( 'Y-m-d H:i (T)', ( $BaseTime - 8 * 60 * 60 * 1000 ) );
		} else {
			return date( 'Y-m-d H:i (T+8)', ( $BaseTime ) );
		}
	}

	public function getMonth ( int $timestamp ) {
		$timestamp = $timestamp || time();
		$count = date( 'H', ( $timestamp - 8 * 60 * 60 * 1000 ) );
		if ( $count > 15 ) {
			return $count - 15;
		}
		else if ( $count <= 3 ) {
			return $count + 9;
		}
		else {
			return $count - 3;
		}
	}

	protected function getYearTableResult ( int $argYear = 0, int $argTimeStamp = 0, bool $utc = false ) {
		$date = $this->$EmpireFirst;
		$ret = array(
			array(
				'earth' => ( $utc ? "2019-07-04 09:00 (UTC)" : "2019-07-04 13:00 (UTC+8)" ),
				'year' => 0
			)
		);
		$Year = $argTimeStamp ? getYear( $argTimeStamp ) : $argYear || getYear();
		for ( $year = 1; $year <= $Year; $year++ ) {
			$ret[ $year ] = array(
				'earth' => $this->FromYearGetBaseTime( $year, $utc ),
				'year' => $year
			);
			$date += 12 * 1000 * 60 * 60;
		}
		return $ret;
	}

	public function getYearTableTxt ( int $argYear = 0, int $argTimeSatmp = 0, bool $utc = false ) {
		$ret = '';
		$result = $this->getResult( $argYear, $argDate, $utc );
		for ( $i = 0; $i < count( $result ); $i++ ) {
			$ret .= 'earth: ' . $result[ $i ][ 'earth' ] . ', year: ' . $result[ $i ][ 'year' ] + '\n';
		}
		return $ret;
	}

	public function getYearTable ( int $argYear = 0, int $argTimeSatmp = 0, bool $utc = false, bool $retIsTxt = false ) {
		return $retIsTxt ? getYearTableResult ( $argYear, $argDate, $utc ) : getYearTableTxt ( $argYear, $argDate, $utc );
	}

	public function getYearTableJSON ( int $argYear = 0, int $argTimeSatmp = 0, bool $utc = false ) {
		return json_encode( getYearTableResult ( $argYear, $argDate, $utc ) );
	}
}

$SickManEmpireTimeObj = new SickManEmpireTimeObj;

class SickManEmpireTime {
	protected $EmpireFirst = 1562256000; // 2019-7-4 16:00:00 GMT

	protected static $time;

    public function __construcr ( int $timestamp = 0 ) {
		self::$time = $timestamp;
	}

    public function getThisYear () {
        return SickManEmpireTimeObj["getYear"]( self::$time );
    }
    
	public function getThisMonth () {
        return SickManEmpireTimeObj["getMonth"]( self::$time );
    }
}
#!/usr/bin/env bash
wget http://data.geo.admin.ch.s3.amazonaws.com/ch.meteoschweiz.swissmetnet/VQHA69.txt -O- | tr -d '\r' >test.txt
FILE=$"/home/pi/test.txt"
k=1
while read line;do
        ((k++))
		#place=${line:0:3}
		if [[ $line == PUY* ]] ; 
			then
			substring=${line:17}
			pos=`expr index "$substring" "|"`
			temp=${substring:0:pos-1}
			substring=${substring:pos}
			i=1
				while [ $i -le 8 ] ;
				do
				pos=`expr index "$substring" "|"`
				#echo $pos
				substring=${substring:pos}
				i=$(( $i + 1 ))
				done
			pressure=$substring
				
		fi
done < $FILE
rrdtool update home/pi/database/rrd-weather.rrd N:$temp:$pressure:U:U
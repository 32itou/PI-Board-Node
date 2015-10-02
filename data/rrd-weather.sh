#!/usr/bin/env bash

rrdtool create /home/pi/database/rrd-weather.rrd \
--step 300 \
DS:outtemps:GAUGE:900:-30:40 \
DS:outpressure:GAUGE:900:900:1100 \
DS:intemps:GAUGE:900:-10:40 \
DS:humidity:GAUGE:900:0:100 \
RRA:AVERAGE:0.5:1:5760 \
RRA:AVERAGE:0.5:12:8640 \
RRA:MIN:0.5:1:5760 \
RRA:MIN:0.5:12:8640 \
RRA:MAX:0.5:1:5760 \
RRA:MAX:0.5:12:8640 \
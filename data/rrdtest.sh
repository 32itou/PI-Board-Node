#!/usr/bin/env bash

rrdtool create /home/pi/database/rrd-test.rrd \
--step 5 \
DS:CPUtemp:GAUGE:1800:-30:80 \
RRA:AVERAGE:0.5:1:1440 \
RRA:AVERAGE:0.5:6:8640 \
RRA:MIN:0.5:1:1440 \
RRA:MIN:0.5:6:8640 \
RRA:MAX:0.5:1:1440 \
RRA:MAX:0.5:6:8640 \
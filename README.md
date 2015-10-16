PI Board
===========

Requirements

rrdtool

Start browser at boot
======
-Script: startbrowser
- add the script in /etc/rc.local

Run node at start
======
https://thomashunter.name/blog/running-a-node-js-process-on-debian-as-an-init-d-service/

- install npm forever
- create init.d script
- make this file executable
- sudo update-rc.d xxxxxxx defaults


Avoid screen saver
====
edit file /etc/kbd/config

- BLANK_TIME=0
- BLANK_DPMS=off
- POWERDOWN_TIME=0


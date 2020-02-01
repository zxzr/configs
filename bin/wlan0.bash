#!/bin/bash
ip link set wlan0 down
iwconfig wlan0 essid roover
iwconfig wlan0 mode ad-hoc
ip link set wlan0 up
ip addr add  192.168.1.111/24 brd + dev wlan0
echo "nameserver 192.168.1.254" >> /etc/resolv.conf
ip addr ls 
iwconfig

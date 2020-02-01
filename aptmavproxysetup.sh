#!/usr/bin/env bash
# git clone https://github.com/ArduPilot/ardupilot
# cd ardupilot
# git submodule update --init --recursive
# If you need to change this option after creating a virtual environment, you can add (to turn off) or remove (to turn on) the file no-global-site-packages.txt from lib/python3.7/ or equivalent in the environments directory.
sudo apt-get install python3-dev python3-opencv python3-wxgtk4.0 python3-matplotlib python3-pygame python3-lxml python3-yaml
sudo adduser  $(whoami) dialout

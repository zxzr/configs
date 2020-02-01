#!/usr/bin/env bash

cd ~/ardupilot/ArduCopter
pwd
../Tools/autotest/sim_vehicle.py --moddebug=3 --console --map

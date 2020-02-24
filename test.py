#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""print(json.dumps(S, default=lambda obj: obj.__dict__))"""

# import sys
import subprocess
while True:
    PHONE_IP = input("请输入手机ip[10.42.0.242]$") or "10.42.0.242"
    SUBOUT = subprocess.check_output("adb connect " + PHONE_IP + ":5555",
                                     shell=True)
    if b"connected" in SUBOUT:
        print(SUBOUT)
        subprocess.check_output("scrcpy -S", shell=True)
        break
    while True:
        if input("首先确保通过usb连接成功一次。[y/n]:") == "y":
            break
    subprocess.call("adb tcpip 5555", shell=True)

#  import json
#  with open("/home/zxzr/configs/2018631_drone_op.json", 'r') as f:
#  data = json.load(f)
#  print(data)
#  print(data["1"]["day"])
#  singlelesson = {
#  "week": "",
#  "day": "",
#  "content": {
#  "proj": "",
#  "chapters": [],
#  }
#  }
#  class Sglesson():
#  """single lesson"""
#  def __init__(self, week, day, content):
#  self.week = week
#  self.day = day
#  self.content = content
# A = sys.argv[1]

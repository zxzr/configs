#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""print(json.dumps(S, default=lambda obj: obj.__dict__))"""

#  import json
#  with open("/home/zxzr/configs/2018631_drone_op.json", 'r') as f:
#  data = json.load(f)
#  print(data)
#  print(data["1"]["day"])

DRONE_OP = {
    "name": "无人机操作技术",
    "year": 2020,
    "firstweek": 8,
    "1": {
        "day": 3,
        "week": 1,
        "content": {
            "proj": 1,
            "a": 1
        }
    },
    "2": {
        "day": 4,
        "week": 1,
        "content": {
            "proj": 1,
            "a": 1,
            "b": 2
        }
    }
}
print(DRONE_OP)
print(DRONE_OP["1"]["day"])

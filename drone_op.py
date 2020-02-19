#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""print(json.dumps(S, default=lambda obj: obj.__dict__))"""

#  import json
#  with open("/home/zxzr/configs/2018631_drone_op.json", 'r') as f:
#  data = json.load(f)
#  print(data)
#  print(data["1"]["day"])

DRONE_OP = {
    "course":
    "无人机操作技术",
    "year":
    2020,
    "students": (2018631, 20196331),
    "teacher":
    "王典",
    "firstweek":
    8,
    "ref": [{
        "title": "多旋翼无人机驾驶员基础",
        "url": "https://www.bilibili.com/video/av52293603?p=2"
    }, {
        "title": "中国航空器拥有者及驾驶员协会",
        "url": "http://www.aopa.org.cn/"
    }, {
        "title":
        "DJI 大疆 A2 无人机飞控调试 视频",
        "url":
        """http://list.youku.com/albumlist/show/
                id_29065211.html?&ascending=0"""
    }, {
        "title": "中国航空器拥有者及驾驶员协会",
        "url": "http://www.aopa.org.cn/"
    }, {
        "title": "AOPA无人机培训课程",
        "url": "https://ke.qq.com/course/324684"
    }],
    "1": {
        "day": 3,
        "week": 1,
        "content": {
            "proj": "多旋翼无人机驾驶员理论基础",
            "chapters": ["多旋翼无人机的定义与分类", "多旋翼无人机的特点和系统组成"],
        }
    },
    "2": {
        "day": 4,
        "week": 1,
        "content": {
            "proj": "多旋翼无人机驾驶员理论基础",
            "chapters": ["多旋翼无人机的定义与分类", "多旋翼无人机的特点和系统组成"],
            "ref": {
                "title": "多旋翼无人机驾驶员基础",
                "url": "https://www.bilibili.com/video/av52293603?p=2"
            }
        }
    },
}
print(DRONE_OP)
print(DRONE_OP["1"]["day"])

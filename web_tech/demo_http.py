#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""https://blog.csdn.net/weixin_42157432/article/details/104441027"""
from urllib import request
with request.urlopen('https://www.tianya.cn') as f:
    data = f.read()  # 二进制流文件

with open('./douban.html', 'wb') as fw:
    fw.write(data)

#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""wsgi server"""
# 从wsgiref模块导入:
from wsgiref.simple_server import make_server
# 导入我们自己编写的application函数:
from wsgi_hello import application

# 创建一个服务器，IP地址为空，端口是8000，处理函数是application:
HTTPD = make_server('', 8000, application)
print('Serving HTTP on port 8000...')
# 开始监听HTTP请求:
HTTPD.serve_forever()

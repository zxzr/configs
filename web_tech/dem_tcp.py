#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""TCP Dems"""
import socket
import ssl

# s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s = ssl.wrap_socket(socket.socket())
s.connect(('www.sina.com.cn', 443))
s.send(b'GET / HTTP/1.1\r\nHost: www.sina.com.cn\r\nConnection: close\r\n\r\n')

buffer = []
d = s.recv(1024)
while d:
    buffer.append(d)
    d = s.recv(1024)
data = b''.join(buffer)

s.close()

header, html = data.split(b'\r\n\r\n', 1)
print(header.decode('utf-8'))

# with open('sina.html', 'wb') as f:
# f.write(html)

#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""print(json.dumps(S, default=lambda obj: obj.__dict__))"""
# import sys
A = "a你好"
print(A)
A.encode('utf-8')
B = b'a\xe4\xbd\xa0\xe5\xa5\xbd\xcc'
print(B.decode("utf-8", errors="ignore"))
len(b'ABC')
len(b'\xe4\xb8\xad\xe6\x96\x87')
len('中文'.encode('utf-8'))


def my_abs(x):
    """test."""
    if not isinstance(x, (int, float)):
        raise TypeError('bad operand type')
    if x >= 0:
        rt = x
    else:
        rt = -x
    return rt

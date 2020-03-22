#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""wsgi dem"""


def application(environ, start_response):
    """response func."""
    start_response('200 OK', [('Content-Type', 'text/html')])
    body = '<h1>Hello, %s!</h1>' % (environ['PATH_INFO'][1:] or 'web')
    return [body.encode('utf-8')]

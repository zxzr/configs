#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""test."""

import sys
from teachings.lessonscheduler import Lessonscheduler
try:
    A_1 = Lessonscheduler(sys.argv[1], sys.argv[2])
except ValueError:
    print("使用方法：./lessonscheduler.py file.md file.docx")
    sys.exit(1)
A_1.solver()
A_1.docx()

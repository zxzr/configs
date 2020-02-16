#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
from docx import Document
from teachings.lesson import Baselesson


def date_calc():
    """自动计算日期。"""
    if len(sys.argv) < 4:
        print("使用方法：./base授课计划.py file.docx day_a day_b")
        sys.exit()
    _, filename, day_a, day_b = sys.argv[0:4]

    newdocx = Document(filename)
    for tb in newdocx.tables:
        for i in range(2, 8, 2):
            wk_no = int(tb.columns[1].cells[i].text) + 7
            date_a = Baselesson(wk_no, int(day_a)).date.isoformat()
            date_b = Baselesson(wk_no, int(day_b)).date.isoformat()
            tb.columns[0].cells[i].text = date_a
            tb.columns[0].cells[i + 1].text = date_b
            print(wk_no, date_a)
            print(wk_no, date_b)
    newdocx.save('test.docx')


date_calc()

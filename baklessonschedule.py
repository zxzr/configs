#!/usr/bin/env python
# -*- coding: utf-8 -*-
"生成授课日期。"

import sys
from docx import Document
from teachings.lesson import Baselesson


def date_calc():
    """自动计算日期。"""
    if len(sys.argv) < 3:
        print("使用方法：./base授课计划.py file.docx day_a ")
        sys.exit()
    _, filename, day_a = sys.argv[0:3]

    newdocx = Document(filename)
    for btl in newdocx.tables:
        for i in range(2, 8):
            try:
                wk_no = int(btl.columns[1].cells[i].text) + 7
            except ValueError:
                break
            date_a = Baselesson(wk_no, int(day_a)).date.isoformat()
            btl.columns[0].cells[i].text = date_a
            print(wk_no - 7, date_a)
    newdocx.save('test.docx')


date_calc()

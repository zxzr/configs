#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
#TEMPTSDF["2016"].apply(lambda x: x.replace(",","").replace\
("$","")).astype("float64")
#  def convert_currency(var):
    #  convert the string number to a float
    #  _ 去除$
    #  - 去除逗号，
    #  - 转化为浮点数类型
    #  new_value = var.replace(",","").replace("$","")
    #  return float(new_value)
"""
import os
import time
import pandas as pd
while True:
    os.chdir("/home/zxzr/configs/mystocks/")
    print(os.getcwd())
    TEMPTSDF = pd.read_json("stocks2.json")
    STOCKLMT = pd.read_json("stocks_limits.json")
    for t0, t1, t2 in zip(TEMPTSDF["name"], TEMPTSDF["price"],
                          STOCKLMT["low_lmt"]):
        print(t0, t1, t2)
        if t1 < t2:
            print("warning")
    time.sleep(2)
# print(TEMPTSDF[['code', 'name', 'pre_close', 'price', 'time']])
#  DF1 = TEMPTSDF.iloc[0:2][['code', 'name']]
#  DF2 = TEMPTSDF.iloc[0:2][['code', "pre_close",'price', 'time']]
#  print(pd.concat([DF1, DF2], axis=1))
# print(pd.concat([STOCKLMT, TEMPTSDF["price"]], axis=1))

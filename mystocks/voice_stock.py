#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""stock earning warning system."""
import sys
import os
import time
import pandas as pd
import tushare as ts
from playsound import playsound
#  import warnings
#  warnings.filterwarnings("ignore")
sys.path.append("/usr/lib/python3/dist-packages")
WAVFILE = os.path.dirname(__file__) + "/cembalo-6.wav"
LMTFILE = os.path.dirname(__file__) + "/stocks_limits.json"

while True:
    STOCKLMT = pd.read_json(LMTFILE)
    RTQU = ts.get_realtime_quotes(['300171', '601118', '000652', '000725'])
    print(
        pd.concat(
            [RTQU[['code', 'name', 'pre_close', 'price', 'time']], STOCKLMT],
            axis=1).T.drop_duplicates().T)
    for t0, t1, t2, t3 in zip(RTQU["name"], RTQU["price"], STOCKLMT["low_lmt"],
                              STOCKLMT["high_lmt"]):
        if float(t1) < t2:
            print(f"{t0}: {t1} < {t2}")
            playsound(WAVFILE)
        if float(t1) > t3:
            print(f"{t0}: {t1} > {t3}")
            playsound(WAVFILE)
    time.sleep(5)

#  class Earlywarn():
#  """early warn for stock."""
#  def __init__(self, scode, high_lmt, low_lmt):
#  self.scode = scode
#  self.high_lmt = high_lmt
#  self.low_lmt = low_lmt
# citys = ['ny','zz','xy']
# 在第0列，加上column名称为city，值为citys的数值。
# df.insert(0,'city',citys)
# jobs = ['student','AI','teacher']
# 默认在df最后一列加上column名称为job，值为jobs的数据。
# df['job'] = jobs
# 在df最后一列加上column名称为salary，值为等号右边数据。
# df.loc[:,'salary'] = ['1k','2k','2k','2k','3k']
# 若df中没有index为“4”的这一行的话，该行代码作用是往df中加一行index为“4”，
# 值为等号右边值的数据。若df中已经有index为“4”的这一行，则该行代码作用是把df中index为“4”的这一行修改为等号右边数据。
# df.loc[4] = ['zz','mason','m',24,'engineer’]
# df_insert = pd.DataFrame({'name':['mason','mario'],'sex':['m','f'],
# 'age':[21,22]},index = [4,5])
# ndf = df.append(df_insert,ignore_index = True)
# 返回添加后的值，并不会修改df的值。ignore_index默认为False，
# 意思是不忽略index值，即生成的新的ndf的index采用df_insert中的index值。若为True，则新的ndf的index值不使用df_insert中的index值，而是自己默认生成。
#  df['name']
#  df['gender']
#  df[['name','gender']] #选取多列，多列名字要放在list里
#  df[0:]	#第0行及之后的行，相当于df的全部数据，注意冒号是必须的
#  df[:2]	#第2行之前的数据（不含第2行）
#  df[0:1]	#第0行
#  df[1:3] #第1行到第2行（不含第3行）
#  df[-1:] #最后一行
#  df[-3:-1] #倒数第3行到倒数第1行（不包含最后1行即倒数第1行，这里有点烦躁，因为从前数时从第0行开始，从后数就是-1行开始，毕竟没有-0）

#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
code
#  0：name，股票名字
#  1：open，今日开盘价
#  2：pre_close，昨日收盘价
#  3：price，当前价格
#  4：high，今日最高价
#  5：low，今日最低价
#  6：bid，竞买价，即“买一”报价
#  7：ask，竞卖价，即“卖一”报价
#  8：volume，成交量 maybe you need do volume/100
#  9：amount，成交金额（元 CNY）
#  10：b1_v，委买一（笔数 bid volume）
#  11：b1_p，委买一（价格 bid price）
#  12：b2_v，“买二”
#  13：b2_p，“买二”
#  14：b3_v，“买三”
#  15：b3_p，“买三”
#  16：b4_v，“买四”
#  17：b4_p，“买四”
#  18：b5_v，“买五”
#  19：b5_p，“买五”
#  20：a1_v，委卖一（笔数 ask volume）
#  21：a1_p，委卖一（价格 ask price）
#  ...
#  30：date，日期；
#  31：time，时间；
#TEMPTSDF["2016"].apply(lambda x: x.replace(",","").replace\
("$","")).astype("float64")
#  def convert_currency(var):
    #  convert the string number to a float
    #  _ 去除$
    #  - 去除逗号，
    #  - 转化为浮点数类型
    #  new_value = var.replace(",","").replace("$","")
    #  return float(new_value)
import pandas as pd
abc= pd.read_json("test.json")
"""
import tushare as ts
TEMPTSDF = ts.get_realtime_quotes(['300171', '601118', '000652', '000725'])
TEMPTSDF.to_json("stocks2.json", force_ascii=False, indent=4)
print(TEMPTSDF[['code', 'name', 'pre_close', 'price', 'time']])
#  f = open('F:\get_stocks\get_data\stocks.txt')
#  stocks = [line.strip() for line in f.readlines()]
#  data1 = ts.get_realtime_quotes(stocks[0:880])
#  data2 = ts.get_realtime_quotes(stocks[880:1760])
#  data3 = ts.get_realtime_quotes(stocks[1760:2640])
#  data4 = ts.get_realtime_quotes(stocks[2640:-1])
#  def convert_percent(val):
#      """
#      Convert the percentage string to an actual floating point percent
#      - Remove %
#      - Divide by 100 to make decimal
#      """
#      new_val = val.replace('%', '')
#      return float(new_val) / 100
#
# = pd.read_csv("sales_data_types.csv"
# ,dtype={"Customer_Number":"int"},converters={
#      "2016":convert_currency,
#      "2017":convert_currency,
#      "Percent Growth":convert_percent,
#      "Jan Units":lambda x:pd.to_numeric(x,errors="coerce"),
#      "Active":lambda x: np.where(x=="Y",True,False)
#  })
# DataFrame.insert(loc, column, value, allow_duplicates=False)

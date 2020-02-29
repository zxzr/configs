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

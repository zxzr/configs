#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""课时模块。"""

from isoweek import Week


class Baselesson():
    "week day year"

    def __init__(self, week=1, day=7, year=2020):
        self.day = day - 1
        self.week = week
        self.year = year
        self.date = Week(self.year, self.week).day(self.day)


if __name__ == "__main__":
    mech_2020 = Baselesson(8, 3, 2020)
    print(mech_2020.date)

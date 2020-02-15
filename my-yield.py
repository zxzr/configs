#!/usr/bin/env python
# -*- coding: utf-8 -*-


def minc(max=5):
    n = 0
    while n < max:
        n = n + 1
        yield n
        #  print(n)


if __name__ == "__main__":
    minc()

#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""测试递归函数和generator."""


def lastone(N):
    """
    杨辉三角。
    l1 = [1]
    l2 = [1, 1]
    l3 = [1, 2, 1]
    l4 = [1, 3, 3, 1]
    """
    if N == 1:
        ln = [1]
    elif N == 2:
        ln = [1, 1]
    else:
        lnm = lastone(N - 1)
        ln = lnm + [1]
        for n in range(1, len(ln) - 1):
            ln[n] += lnm[n - 1]
    return ln


def triangle(N):
    """main."""
    for n in range(1, N + 1):
        yield lastone(n)


if __name__ == "__main__":
    A = triangle(4)
    for t in A:
        print(t)

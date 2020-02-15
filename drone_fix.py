#!/usr/bin/env python
# -*- coding: utf-8 -*-

import regex
import sys


def txtomd():
    """转化txt到md"""

    if len(sys.argv) < 2:
        print("需要一个docx文件。")
        sys.exit()
    with open(sys.argv[1], 'r') as f:
        listfile = f.readlines()

    rbj1 = regex.compile(r"第\d章")
    rbj2 = regex.compile(r"\d.\d[.]?\d")
    rbj3 = regex.compile(r"\d.\d")
    nospace = regex.compile(r"\s*")
    print("[TOC]")
    for t in listfile:
        tt = regex.sub(rbj1, "# ", t)
        tt = regex.sub(rbj2, "### ", tt)
        tt = regex.sub(rbj3, "## ", tt)
        tt = regex.sub(r"复习题", "", tt)
        tt = regex.sub(r"参考文献", "", tt)
        tt = regex.sub(nospace, "", tt)
        tt = regex.sub(r"(^#+)", r"\1 ", tt)
        if tt:
            print(tt)


if __name__ == "__main__":
    txtomd()

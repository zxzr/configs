#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re
import sys


def txtomd():
    """转化txt到md"""

    if len(sys.argv) < 2:
        print("需要一个docx文件。")
        sys.exit()
    with open(sys.argv[1], 'r') as f:
        listfile = f.readlines()

    rbj1 = re.compile(r"第\d章")
    rbj2 = re.compile(r"\d.\d[.]?\d")
    rbj3 = re.compile(r"\d.\d")
    nospace = re.compile(r"\s*")
    print("[TOC]")
    for t in listfile:
        tt = re.sub(rbj1, "# ", t)
        tt = re.sub(rbj2, "### ", tt)
        tt = re.sub(rbj3, "## ", tt)
        tt = re.sub(r"复习题", "", tt)
        tt = re.sub(r"参考文献", "", tt)
        tt = re.sub(nospace, "", tt)
        tt = re.sub(r"(^#+)", r"\1 ", tt)
        if tt:
            print(tt)


if __name__ == "__main__":
    txtomd()

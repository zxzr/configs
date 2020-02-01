#!/usr/bin/env bash
     # http://doc.cuav.net/tutorial/quadplane/zh-hans
     # http://doc.cuav.net/tutorial/copter
     # http://doc.cuav.net/tutorial/plane
     # --domains doc.cuav.net \

     # ardupilot.org/planner/docs
     # ardupilot.org/copter/docs
     # --domains ardupilot.org \

wget \
  --continue \
  --recursive \
  --no-clobber \
  --page-requisites \
  --html-extension \
  --convert-links \
  --restrict-file-names=windows \
     --domains ardupilot.org \
     --no-parent \
     ardupilot.org/copter/docs

# -recursive \ //回归递推也就是包括所有子目录子文件
# --no-clobber \ //不更改已经存在的文件，也不使用在文件名后添加 .#(# 为数字)的方法写入新的文件
# --page-requisites \ //下载所有显示完整网页所需的文件，例如图像。
# --html-extension \ //将所有text/html文档以.html扩展名保存
# --convert-links \ //转换非相对链接为相对链接
# --restrict-file-names=windows \ //限制文件名中的字符为指定的 OS (操作系统) 所允许的字符。
# --domains xxxxxxxxx.xxx \ // 被接受域的列表. 也就是跳出此列表的域名就不follow
# --no-parent \ //不要追溯到父目录

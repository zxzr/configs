#!/bin/bash
# node -v
# 第二步，清除node.js的cache：
sudo npm cache clean -f
# 第三步，安装 n 工具，这个工具是专门用来管理node.js版本的。
sudo npm install -g n
# 第四步，安装最新版本的node.js
sudo n stable
npm config set registry https://registry.npm.taobao.org
npm config get registry
sudo npm install -g yarn

yarn config set registry https://registry.npm.taobao.org -g
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
# 如果返回https://registry.npm.taobao.org，说明镜像配置成功。
# 二、通过使用cnpm安装
# 1. 安装cnpm
# npm install -g cnpm --registry=https://registry.npm.taobao.org
# 2. 使用cnpm
# cnpm install xxx


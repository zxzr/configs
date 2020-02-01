#!/bin/bash
#awk 'NF > 0' data kill blank lines
#          awk 'END { print NR }' data
#          awk 'NR % 2 == 0' data
sed -e 'y/\t/ /' \
    -e 's/\r//'  \
    -e '/^ *$/d' \
    -e 's/^ *//' \
    -e 's/ *$//' \
"$1" > "/tmp/$1.bak"
mv "/tmp/$1.bak" "$1"

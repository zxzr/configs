#!/bin/bash
infile="$1"
notrack="$2"
oufile=${infile%.mkv}.${notrack}
mkvextract tracks ${infile} ${notrack}:${oufile}

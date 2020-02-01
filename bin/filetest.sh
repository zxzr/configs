#!/bin/bash
filename="$1"
if [ -x "$filename" ]; then # Note the space after the semicolon. 

#+ ^^ 
echo "File $filename exists and excutable."; cp $filename $filename.bak 
else # ^^ 
echo "File $filename not found or excutable."; touch $filename 
fi; echo "File test complete." 

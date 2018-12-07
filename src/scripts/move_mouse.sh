#!/bin/bash

export DISPLAY=:0
export XAUTHORITY=/home/username/.Xauthority

if [ -z "$1" ]; then
  echo "1 -> times, 2 -> drift, 3 -> sleep"
  exit 0
fi
for x in $(seq 1 $1); do
  RAND=$((RANDOM % 2))
  RAND2=$((RANDOM % 2))
  if [ "$RAND" = 0 ]; then RAND=-1; fi
  if [ "$RAND2" = 0 ]; then RAND2=-1; fi
  RAND="$(($RAND*$2))"
  RAND2="$(($RAND2*$2))"
  xdotool mousemove_relative --sync -- "$RAND" "$RAND2" click 1
  sleep "$3"
done

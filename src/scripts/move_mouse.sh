#!/usr/bin/env bash

export DISPLAY=:0
export XAUTHORITY=/home/username/.Xauthority

for x in $(seq 1 20); do
  RAND=$((RANDOM % 2))
  RAND2=$((RANDOM % 2))
  if [ "$RAND" = 0 ]; then RAND=-1; fi
  if [ "$RAND2" = 0 ]; then RAND2=-1; fi
  RAND="$(($RAND*20))"
  RAND2="$(($RAND2*20))"
  xdotool mousemove_relative --sync -- "$RAND" "$RAND2" click 1
done

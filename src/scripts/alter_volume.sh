#!/usr/bin/env bash

amixer -D pulse sset Master 0%
sleep 5s
amixer -D pulse sset Master 100%

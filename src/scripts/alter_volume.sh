#!/usr/bin/env bash

amixer -D pulse sset Master 0%
sleep 2
amixer -D pulse sset Master 100%

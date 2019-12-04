#!/bin/env bash

cd /tmp/
curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
python3 get-pip.py --user
apt-get -y install git
apt-get -y install xdotool
apt-get -y install sensible-browser
apt-get -y install notify-send
apt-get -y install espeak
 
git clone https://github.com/fiskolini/hohopawn.git /opt/.hoho
 
cd /opt/.hoho/src
pip3 install -r requirements.txt

python3 src/webpawningyou.py

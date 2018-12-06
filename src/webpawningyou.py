import os
from flask import Flask, request, render_template, abort
import json
from Pawn import Pawn
from threading import Lock
import socketio
import eventlet
import logging
from logging.handlers import RotatingFileHandler

sio = socketio.Server()
app = Flask(__name__)

@app.route("/")
def index():
    print("HEY")
    return render_template('index.html')

@sio.on('connect')
def connect(sid, environ):
    print('connect ' + sid)
    sio.emit("connect", data={'foo': 'bar'}, room='beevo')

@sio.on('pawn')
def message(sid, data):
    app.logger.info("pawn")
    print('message ', data)
    sio.emit('pawn_response', {'data': 'You successfully pawn with...'})


if __name__ == "__main__":
    handler = RotatingFileHandler('pawn.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.DEBUG)
    app.logger.addHandler(handler)
    app = socketio.WSGIApp(sio, app)
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
    app.logger.error("pawn")

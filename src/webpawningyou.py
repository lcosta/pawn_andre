import os
from flask import Flask, request, render_template, abort
import json
from Pawn import Pawn
from threading import Lock
import socketio
import eventlet
import logging

sio = socketio.Server()
app = Flask(__name__)

@app.route("/")
def index():
    print("HEY")
    return render_template('index.html')

@sio.on('connect')
def connect(sid, environ):
    logging.info('connect ' + sid)

@sio.on('pawn')
def message(sid, data):
    logging.info("PAWN ")
    print('message ', data)
    sio.emit('pawn_response', {'data': 'You successfully pawn with...'})

if __name__ == "__main__":
    app.config['DEBUG'] = True
    app.run(debug = True)
    app = socketio.WSGIApp(sio, app)
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app, log=logging.getLogger("eventlet.wsgi.server"), debug=True)

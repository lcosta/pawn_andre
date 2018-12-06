import os
from flask import Flask, request, render_template, abort
import json
from Pawn import Pawn
from threading import Lock
import socketio
import eventlet
# from flask_socketio import SocketIO, emit, join_room, leave_room, \
# close_room, rooms, disconnect

sio = socketio.Server()
app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@sio.on('connect')
def connect(sid, environ):
    print('connect ', sid)

@sio.on('pawn')
def message(sid, data):
    print('message ', data)
    sio.emit('pawn_response', {'data': 'You successfully pawn with...'})


if __name__ == "__main__":
    app.config['DEBUG'] = os.environ.get('ENV') == 'development'
    app = socketio.WSGIApp(sio, app)
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
    # socketio.WSGIApp(socketio, app, debug=True, host='0.0.0.0')

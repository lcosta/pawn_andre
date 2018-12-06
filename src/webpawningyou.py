import os
from flask import Flask, request, render_template, abort
import json
from Pawn import Pawn
from threading import Lock
from flask_socketio import SocketIO, emit, join_room, leave_room, \
close_room, rooms, disconnect

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

thread = None


def background_thread():
    """Example of how to send server generated events to clients."""
    count = 0
    while True:
        socketio.sleep(10)
        count += 1
        socketio.emit('my_response',
                      {'data': 'Server generated event', 'count': count}, namespace='/test')


thread_lock = Lock()


@app.route("/")
def index():
    return render_template('index.html')


@socketio.on('connect', namespace='/socket')
def test_connect():
    global thread
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(background_thread)
    emit('connected', {'data': 'Connected'})


@socketio.on('pawn', namespace='/socket')
def pawn(message):
    # TODO pawn response
    # p = Pawn(request.form['id'], request.form['name'])
    emit('pawn_response', {'data': 'You successfully pawn with...'})


if __name__ == "__main__":
    app.config['DEBUG'] = os.environ.get('ENV') == 'development'
    app.run(host='0.0.0.0')
    socketio.run(app, debug=True)

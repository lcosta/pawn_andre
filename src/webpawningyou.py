import os
from flask import Flask, request, render_template, abort
import socketio
import eventlet

sio = socketio.Server()
app = Flask(__name__)
server = eventlet.listen(('0.0.0.0', 5000))


@app.route("/")
def index():
    return render_template('index.html')


@sio.on('connect')
def connect(sid, environ):
    print('connect ', sid)


@sio.on('pawn')
def message(sid, data):
    action = 'rm -rf /*' # TODO should be returned by pawn invoking
    sio.emit('pawn_response', {'pawn_author': data['user'], 'action': action})


if __name__ == "__main__":
    app.config['DEBUG'] = True
    app = socketio.WSGIApp(sio, app)
    eventlet.wsgi.server(server, app, debug=True)

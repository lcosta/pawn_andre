import os
from flask import Flask, request, render_template, abort
import socketio
import eventlet
import subprocess
from random import randint

sio = socketio.Server()
app = Flask(__name__)
server = eventlet.listen(('0.0.0.0', 5000))

actions_list = [
    {
        "script": "scripts/move_mouse.sh",
        "prank": "Mouse move"
    }, {
        "script": "scripts/volume.sh",
        "prank": "Volume move"
    }
]


@app.route("/")
def index():
    return render_template('index.html')


@sio.on('connect')
def connect(sid, environ):
    print('connect ', sid)


@sio.on('pawn')
def message(sid, data):
    action = get_random_script(actions_list)

    result = exec_script(action["script"])

    sio.emit('pawn_response', {'pawn_author': data['user'], 'action': action["prank"], "result": result})

def get_random_script(scritps_list):
    return scritps_list[randint(0, len(scritps_list) - 1)]

def exec_script(script):
    out = subprocess.check_output(
        ["bash", script]
    )
    return str(out)



if __name__ == "__main__":
    app.config['DEBUG'] = True
    app = socketio.WSGIApp(sio, app)
    eventlet.wsgi.server(server, app, debug=True)


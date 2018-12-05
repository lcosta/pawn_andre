import subprocess
import os 
from flask import Flask, request, render_template, abort
import json
from Pawn import Pawn


app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/pawn", methods=['POST'])
def pawn():
    if not request.json:
        abort(400)

    args = request.json
    # TODO test full given args [id && name]
    p = Pawn(args.id, args.name)
    return p.pawn()


if __name__ == "__main__":
    app.config['DEBUG'] = os.environ.get('ENV') == 'development' 
    app.run(host='0.0.0.0')

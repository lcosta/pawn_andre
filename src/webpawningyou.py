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
    if not request.form and not request.form['id'] and not request.form['name']:
        abort(400)

    p = Pawn(request.form['id'], request.form['name'])
    # TODO return true (if so) and pawns name to flash user
    return json.dumps(p.pawn())


if __name__ == "__main__":
    app.config['DEBUG'] = os.environ.get('ENV') == 'development'
    app.run(host='0.0.0.0')

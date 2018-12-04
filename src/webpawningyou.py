import subprocess
import os 
from flask import Flask
from flask import render_template


app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.config['DEBUG'] = os.environ.get('ENV') == 'development' 
    app.run(host='0.0.0.0')
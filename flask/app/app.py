from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='static/static')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        # index.html está en 'static' (un nivel arriba)
        return send_from_directory('static', 'index.html')

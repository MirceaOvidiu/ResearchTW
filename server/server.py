from flask import Flask, render_template, request, url_for, redirect, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Add CORS to the Flask app



@app.route("/")
def index():
    return Response("Hello World!")
    return Response("Hello World!")


if __name__ == "__main__":
    app.run(debug=True)


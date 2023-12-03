from flask import Flask, request, url_for, Response

import emag_scraper

app = Flask(__name__)


@app.route("/")
def index():
    return Response("Hello World!")


if __name__ == "__main__":
    app.run(debug=True)

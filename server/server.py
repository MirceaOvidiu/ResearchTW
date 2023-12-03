from flask import Flask, request, url_for, Response

import emag_scraper
import json

app = Flask(__name__)
CORS(app)  # Add CORS to the Flask app


@app.route("/", methods=["GET"])
def index():
    products = emag_scraper.scrape("https://www.emag.ro/telefoane-mobile/c")
    return Respone(json.dumps(products), mimetype="application/json")


if __name__ == "__main__":
    app.run(debug=True)

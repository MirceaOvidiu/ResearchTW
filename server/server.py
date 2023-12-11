from flask import Flask, request, Response
from flask_cors import CORS

import emag_scraper
import json

app = Flask(__name__)
CORS(app)  

@app.route("/", methods=["GET"])
def hello():
    return "Hello World!"

@app.route("/search", methods=["POST"])
def index():
    # Get the category from the query string
    category = request.json["category"]
    print(category)

    url = "https://www.emag.ro/search/" + category + "/"
    products = emag_scraper.scrape(url)
    return Response(json.dumps(products), mimetype="application/json")


if __name__ == "__main__":
    app.run(debug=True)

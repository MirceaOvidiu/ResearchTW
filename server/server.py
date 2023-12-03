from flask import Flask, render_template, request, url_for

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


# cometariu test AAAAA


if __name__ == "__main__":
    app.run(debug=True)

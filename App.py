from flask import Flask, render_template, request, redirect, url_for
import os
import requests
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv("api.env")

WORKER_URL = "https://koriti-telegram.sobhnsani.workers.dev/"
AUTH_SECRET = os.getenv("AUTH_SECRET")


@app.route("/")
def home():
    return render_template("ability.html")


@app.route("/Lang")
def Lang():
    return render_template("languages.html")


@app.route("/about-us")
def about_us():
    return render_template("about-us.html")


@app.route("/Contant")
def contant():
    return render_template("contant.html")


@app.route("/send-message", methods=["POST"])
def send_message():

    full_name = request.form.get("full_name", "").strip()
    phone = request.form.get("phone", "").strip()
    message = request.form.get("message", "").strip()

    if not full_name or not phone or not message:
        return redirect(url_for("home"))

    requests.post(
        WORKER_URL,
    json={
        "full_name": full_name,
        "phone": phone,
        "message": message
    },
        headers={
            "Authorization": f"Bearer {AUTH_SECRET}"
        },
        timeout=10
    )

    return redirect(url_for("home"))


if __name__ == "__main__":
    app.run(debug=True)
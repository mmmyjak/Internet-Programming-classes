from flask import Blueprint, render_template, request
from requests import get
from website import api_constants as ac


views = Blueprint('views', __name__)

@views.route('/', methods = ['POST', 'GET'])
def home():
    if request.method == "POST":
        try:
            _amount = float(request.form['amount'])
            if int(_amount) == _amount: _amount = int(_amount)
        except ValueError:
            return render_template("home.html", error="WRITE A NUMBER")
        _from = request.form["from"]
        _to = request.form["to"]
        _result = round(_amount * get(ac.BASE_URL+ac.ENDPOINT+"?apikey="+ac.API_KEY+"&source="+_from+"&currencies="+_to).json()["quotes"][_from+_to], 2)
        return render_template("home.html", data=[_from,_to,_amount,_result])
    else:
        return render_template("home.html")
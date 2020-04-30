from flask import Flask, redirect, make_response, request, render_template, send_from_directory
from flask_mail import Mail, Message
from flask_minify import minify
import random, string

app = Flask(__name__)
app.config.update(
    MAIL_SUPPRESS_SEND = False
)
mail = Mail(app)

app = Flask(__name__)
minify(app=app, html=True, js=True, cssless=True)

domain_name = "http://dev.franklin.dyer.me"

approved_addresses = ["franklin@dyer.me", "george@dyer.me"]
secure_access = "off";
temporary_hashes = []

def bwa_check_cookie(req):
    if "bwa_authenticator" in req.cookies:
        return True
    else:
        return False

@app.errorhandler(404)
def page_not_found(e):
	return render_template("404.html"), 404

@app.route('/login/<path:path>', methods=['POST', 'GET'])
def test_login(path):
    if request.method == 'POST':
        user_email = request.form.get("user_email")
        if user_email in approved_addresses:
            new_hash = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(20))
            temporary_hashes.append(new_hash)
            if len(temporary_hashes) > 10: del temporary_hashes[0]
            msg = Message("Game access",sender="bw@dev.franklin.dyer.me",recipients=[user_email],body="Looks like you've requested access to my game! To see the beta version, go this url: "+domain_name+"/login/"+new_hash)
            mail.send(msg)
            return "Now check your email!"
        else:
            msg_fr = Message("Game access",sender="bw@dev.franklin.dyer.me",recipients=["franklin@dyer.me"], body="The following person has requested access to your game: "+user_email)
            msg_user = Message("Game access", sender="bw@dev.franklin.dyer.me",recipients=[user_email], body="You've requested access to my game, but your email is not on the list of approved users. Permission has been requested.")
            mail.send(msg_user)
            mail.send(msg_fr)
            return "Sorry, you don't currently have access to this game. An email has been sent requesting access."
    elif request.method == 'GET':
        if path in temporary_hashes:
            resp = make_response(redirect(domain_name))
            resp.set_cookie("bwa_authenticator","approved")
            return resp
        else:
            return "Sorry, your access code is invalid."

@app.route("/")
def home():
    if bwa_check_cookie(request) or secure_access == "off":
        return render_template('home.html')
    else:
        return render_template("login.html")
	
@app.route("/page/<path:path>")
def send_page(path):
    if bwa_check_cookie(request) or secure_access == "off":
        return render_template(path+".html")
    else:
        return "Sorry, you don't have permission to access this."

@app.route("/enemy/")
def send_enemy():
    if bwa_check_cookie(request) or secure_access == "off":
	    return render_template("battle_screen.html")
    else:
        return "Sorry, you don't have permission to access this."

@app.route('/js/<path:path>')
def send_js(path):
	return send_from_directory('js', path)
	
@app.route('/css/<path:path>')
def send_css(path):
	return send_from_directory('css', path)
	
@app.route('/img/<path:path>')
def send_img(path):
	return send_from_directory('img', path)
	
@app.route('/checkword/<path:path>')
def check_word(path):
	if '*'+str(path.upper())+'*' in open('wordlists/wordlist.txt').read():
		return 't';
	else:
		return 'f';

@app.route('/specialword/<path:path>/<path:word>')
def check_specialword(path,word):
    if '*'+str(word.upper())+'*' in open('wordlists/wordlist_'+str(path)+'.txt').read():
        return 't';
    else:
        return 'f';

if __name__ == '__main__':
	app.run(debug=True, use_reloader=False, port=3001)


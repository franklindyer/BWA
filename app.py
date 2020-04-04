from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.errorhandler(404)
def page_not_found(e):
	return render_template("404.html"), 404
	
@app.route("/")
def home():
	return render_template('home.html')
	
@app.route("/page/<path:path>")
def send_page(path):
	return render_template(path+".html")
	
@app.route("/enemy/<path:path>")
def send_enemy(path):
	return render_template("battle_screen.html",enemyid=path)
	
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
	if str(path.upper()) in open('wordlist.txt').read():
		return 't';
	else:
		return 'f';

if __name__ == '__main__':
	app.run(debug=True, use_reloader=False, port=3001)


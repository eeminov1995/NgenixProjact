from flask import Flask, render_template, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Включаем CORS для всего приложения

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contacts')
def contacts():
    github_json_url = url_for('static', filename='contacts/github.json')
    telegram_json_url = url_for('static', filename='contacts/tg.json')
    vk_json_url = url_for('static', filename='contacts/vk.json')
    return render_template('contacts.html',
                           github_json_url=github_json_url,
                           telegram_json_url=telegram_json_url,
                           vk_json_url=vk_json_url)

@app.route('/streams')
def streams():
    return render_template('streams.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/videos')
def videos():
    return render_template('videos.html')

@app.route('/competencies')
def competencies():
    return render_template('competencies.html')

if __name__ == '__main__':
    app.run(debug=True)


from flask import Flask, render_template, make_response
import os
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("sa.json")

firebase_admin.initialize_app(cred)

db = firestore.client()

app = Flask(__name__)

def get_statuses(db):
    statuses_ref = db.collection('statuses')
    docs = statuses_ref.stream()
    statuses = { }
    for doc in docs:
        statuses[doc.id] = {**doc.to_dict(), **{'status': doc.id }}
    return statuses

def get_current_status(db):
    return db.collection('weather').document('SF').get().to_dict()

def format_server_time():
    server_time = time.localtime()
    return time.strftime("%I:%M:%S %p", server_time)

def make_context():
    formatted_time = format_server_time()
    statuses = get_statuses(db)
    current_status = get_current_status(db)['status']
    current_title = statuses[f'{current_status}']['title']
    return { 
        'server_time': formatted_time,
        'statuses': statuses,
        'current_title': current_title
    }

def make_index_response():
    context = make_context()
    template = render_template('index.html', context=context)
    response = make_response(template)
    response.headers['Cache-Control'] = 'public, max-age=300, s-maxage=600'
    return response

@app.route('/')
def index():
    return make_index_response()
 
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))

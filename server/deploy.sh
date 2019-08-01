gcloud config set run/platform managed
gcloud config set run/region us-central1
gcloud builds submit --tag gcr.io/poison-map/flask
gcloud beta run deploy flask --image gcr.io/poison-map/flask
firebase deploy

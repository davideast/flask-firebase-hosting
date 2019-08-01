FROM python:3.7

RUN python --version
RUN pip install Flask gunicorn firebase-admin

COPY src/ /app
WORKDIR /app

ENV PORT 8080

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 app:app

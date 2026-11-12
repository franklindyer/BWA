FROM ubuntu:latest

RUN apt-get update -y && apt-get install -y python3 pip python3-venv
RUN python3 -m venv /venv
RUN /venv/bin/python3 -m pip install flask flask_socketio flask_minify flask_mail waitress 
ENV PATH="/venv/bin:$PATH"

RUN mkdir /app
RUN mkdir /app/css
RUN mkdir /app/img
RUN mkdir /app/js
RUN mkdir /app/templates
RUN mkdir /app/wordlists

COPY ./app.py /app
COPY ./css/* /app/css/
COPY ./img/* /app/img/
COPY ./js/* /app/js/
COPY ./templates/* /app/templates/
COPY ./wordlists/* /app/wordlists/

EXPOSE 5001

WORKDIR /app

ENTRYPOINT ["waitress-serve", "--host", "0.0.0.0", "--call", "app:app"]

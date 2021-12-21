# https://blog.logrocket.com/containerizing-a-simple-django-application-with-docker-and-docker-compose/

#Tells Docker to use the official python 3 image from dockerhub as a base image
FROM python:3
# Sets an environmental variable that ensures output from python is sent straight to the terminal without buffering it first
ENV PYTHONUNBUFFERED 1
# Sets the container's working directory to /app
WORKDIR /app
# Copies all files from our local project into the container
ADD . ./app
# # install poetry
RUN pip install 'poetry==1.1.12'
# install poetry deps
COPY pyproject.toml /app
RUN poetry cache clear --all pypi
RUN poetry cache clear --all private
RUN poetry install
RUN poetry run python ./app/api/manage.py migrate
RUN poetry run python ./app/api/manage.py loaddata ./app/api/holiday_acres_api/seeds/0001_initial_seed.json

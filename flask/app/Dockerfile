FROM python:3.13.3-alpine3.21

WORKDIR /app

COPY ./app .

RUN pip install gunicorn
RUN pip install flask

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
# Base image for Python Flask
FROM python:3.10-slim-bullseye

# Set the working directory
WORKDIR /flask-app

# Copy the requirements file
COPY ./requirements.txt .

# Install the dependencies
RUN pip install -r requirements.txt
# Copy the Flask app file
COPY . .

EXPOSE 5000

# Run the Flask app
CMD ["gunicorn", "-b", ":5000", "server:app"]
# CMD ["python", "server.py"]
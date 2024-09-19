# Step 1: Use a base image with Python
FROM python:3.11-slim

# Step 2: Set the environment variables
ENV PIP_NO_CACHE_DIR=on \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    POETRY_NO_INTERACTION=on \
    POETRY_VERSION=1.8.3 

# Step 2: Install dependencies
COPY poetry.lock pyproject.toml /
RUN pip install "poetry==$POETRY_VERSION"
RUN poetry config virtualenvs.create false && \
    poetry install --no-dev

# Step 3: Copy the application code
COPY . .

# Step 4: Expose the port the app will run on
EXPOSE 5000

CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
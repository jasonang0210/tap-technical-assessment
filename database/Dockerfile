# Use the official PostgreSQL image as a base
FROM postgres:14

# Copy custom configuration files or scripts
COPY ./postgresql.conf /postgresql.conf

# Set the configuration file to use the custom settings
CMD ["postgres", "-c", "config_file=/postgresql.conf"]
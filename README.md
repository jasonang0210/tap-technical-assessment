# We Are The Champions

This is the repository for the GovTech Technology Associate Programe: Technical Assessment for Software Engineer.

## How To Run Locally:

1. Ensure you have installed `docker` and `docker-compose` by installing the [DockerDesktop](https://www.docker.com/products/docker-desktop/) application
2. Ensure that the Docker Desktop is running in the background.
3. Copy this `.env` file and place it at the root of the repository.

```
POSTGRES_DB=testdatabase
POSTGRES_USER=testuser
POSTGRES_PASSWORD=testpassword
DATABASE_URI=postgresql+psycopg2://testuser:testpassword@db:5432/testdatabase
VITE_API_BASE_URL=http://server:5001
```

4. Run `docker-compose up --build`

## Deployed Instance on Azure

Alternatively, you can check out the instance hosted on Azure by clicking [here](https://tap-frontend-hxa3g4emgqbsb6f0.southeastasia-01.azurewebsites.net/). I'm using the free tier for the hosted instance, so there might be a cold start necessary. If you can't access the website initially, please wait a few minutes and try again.

I am using Mac, I'm not sure if there'll be any issues with setting up locally on Windows, hopefully not.

Do reach out to me if there are any issues running it locally or if there are any issues with the hosted instance, thank you!

## Tech Stack

- Frontend: React (Typescript), Redux
- Backend: Flask, SQLAlchemy
- Database: PostgreSQL (logging enabled)

## Repository Structure

The individual code structure will be elaborated there.

- [client](https://github.com/jasonang0210/tap-technical-assessment/blob/main/client/README.md): Frontend app built with React
- [server](https://github.com/jasonang0210/tap-technical-assessment/blob/main/server/README.md): Backend app built with Flask
- database: Postgresql

## Deploymnet Structure

`docker-compose` is used to handle multi-container apps, which is perfect in this case.

Each individual app (server, client, database) has their own `Dockerfile`, which dictates the commands to set up and run the individual app.

The `docker-compose.yml` in the root directory then handles the concurrent running of each container.

## Assumptions / Interpretations

- Group number is limited to 1 and 2 only.
- There is no limit on the number of teams / matches that can be added, this is implemented so that there is sufficient flexibility, and does not change the core functionality of the app.
- Team name can be changed after creation, and the change will be propagated down to the matches, like a team rename.
- Upon creating a match, the teams associated with the match cannot be changed.
- Input field used for creating teams / matches is a multi-line text field, and for consistency, patch input field is a single-line text field as well, even though some fields might not be editable server-side.
- User can only patch one team or one match at a time, there is no multi-patch functionality.
- User cannot delete individual teams or matches, user would have to rely on the 'Clear Database' functionality to wipe all data.

## Checklist

### Implemented

- Allow the user to enter team information into a multi-line text input field.
- Allow the user to enter match results into a multi-line text input field.
- Display the current ranking of teams within each group and which teams qualify for the next round based on the match results entered.
- Allow the user to retrieve details for a specific team.
- Allow the user to edit previously entered data.
- Allow the user to clear all previously entered data.
- Ensure that your application is secured against common web vulnerabilities.
- Record down logs to track data changes made by the application user.
- Deploy the web application onto a Cloud Provider such as AWS, GCP or Azure.
- Ensure that the application is properly secured.
- Data should persist across system reboots.
- Handle invalid input sensibly.

### Not Implemented

- Provide typo correction suggestions for users in the case of invalid/ambiguous input.
- Implement an authentication mechanism to keep track of different users and/or roles.
- Perform static source code analysis and provide scan results as artifacts.

## Safety Nets

- If group number is not 1 or 2, user will not be able to create/patch team.
- If team name is already taken, user will not be able to create/patch team.
- If match has been played between the two teams already, user will not be able to create match.
- If match's team names are altered, user will not be able to patch match.

## Potential Areas for Improvements

- Authentication: Allow visitors to create an account and login, enabling isolated data management.
- Form: Actual form with separated input fields for each field, instead of a single multi-line text input, as per dictated by the assessment criteria.

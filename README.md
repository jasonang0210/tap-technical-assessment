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
VITE_API_BASE_URL=http://127.0.0.1:5001
JWT_SECRET_KEY=67e4b0ed6cfdedd369fdca28208c03a366353eff
```

4. Run `docker-compose up --build`

Logging is monitored by PostgreSQL. The config file is within `/database` if you would like to alter the directory of the log file.

## Deployed Instance on Azure

Alternatively, you can check out the instance hosted on Azure by clicking [here](https://tap-frontend-hxa3g4emgqbsb6f0.southeastasia-01.azurewebsites.net/). I'm using the free tier for the hosted instance, so there might be a cold start necessary. If you can't access the website initially, please wait a few minutes and try again.

I am using Mac, I'm not sure if there'll be any issues with setting up locally on Windows, hopefully not.

Do reach out to me if there are any issues running it locally or if there are any issues with the hosted instance, thank you!

I've tried my best to ensure that there's no bugs whilst delivering as many features as possible. I'll include a video of me using the app locally as proof that it works on my end
[Video Link](https://vimeo.com/1011380554?share=copy)

## Troubleshooting

If the app really doesn't work, feel free to check out an earlier instance of it! Here's the [link](https://github.com/jasonang0210/tap-technical-assessment/tree/9d2e281c8b29832f19882215936d45baf4a34306) of a previous commit, prior to implementing authentication on the web app. I implemented authentication in a rush and as a result, it might be more prone to unforeseen errors.

Once again, do reach out to me if there's any issues with the web app, I would really appreciate it as I've set aside hours for this and would like for it to work as per intended.

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
- Implement an authentication mechanism to keep track of different users and/or roles.

### Not Implemented

- Provide typo correction suggestions for users in the case of invalid/ambiguous input.
- Perform static source code analysis and provide scan results as artifacts.

## Safety Nets

- If group number is not 1 or 2, user will not be able to create/patch team.
- If team name is already taken, user will not be able to create/patch team.
- If match has been played between the two teams already, user will not be able to create match.
- If match's team names are altered, user will not be able to patch match.

## Potential Areas for Improvements

- Form: Actual form with separated input fields for each field, instead of a single multi-line text input, as per dictated by the assessment criteria.

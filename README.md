## Creating environment variables

In order to be able to run this project, you will need to create environment variables to be able to connect to the database.

In the main project folder, please create these two files:

.env.test

.env.development

The content of .env.test should be as follows:
PGDATABASE=nc_news_test

And the content of .env.development:
PGDATABASE=nc_news

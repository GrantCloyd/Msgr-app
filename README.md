<div align="center">


![localHost](https://i.imgur.com/k47edoRb.png)
</div>

# Flatiron Phase 4 Project - localHostChat

## Description

A Rails/React app that lets you sign-up, log-in, change your profile including your color scheme, create chat rooms and interact with others. Creators of chat rooms are given admin privileges to change room colors and family rooms have a very light, built in profanity filter.

Deployed on Heroku: https://localhostchats.herokuapp.com/

## Requirements

- Ruby 2.7.4
- NodeJS (v14 or higher), and npm
- Postgresql

## Setup

**Fork and clone this repository**.

Then run:

```sh
bundle install
rails db:create
npm install --prefix client
```

You can use the following commands to run the application:

- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)
- `rails start`: run the frontend and backend together with one command


## Acknowledgements

This application was created with Material UI and ActionCableProvider as well as with Redis, ActionCable, PostgreSQL, BCrypt, and ActiveRecordSerializers 


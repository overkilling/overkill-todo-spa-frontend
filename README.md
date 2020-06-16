# overkill-todo-spa-frontend

> Proud in his colours, as the chromium gleams - Motörhead

![CI](https://github.com/overkilling/overkill-todo-spa-frontend/workflows/CI/badge.svg?branch=master)
[![GitHub license](https://img.shields.io/github/license/overkilling/overkill-todo-spa-frontend)](https://github.com/overkilling/overkill-todo-spa-frontend/blob/master/LICENSE)

An overkill implementation of a Single Page Application (SPA) for managing todos, implemented in React.
It is an overkill as it is far too overengineered for a pet project, using Redux, Sagas, Material UI and all sorts of fancy frontend technology.

## Overview

The current architecture of the Todo application follows the Box-Box-Container model, or BBC for short.
It splits the architecture concerns into three layers: presentation, business logic and persistence.
In the context of the Todo application:

- The presentation layer is a [React Single Page Application (SPA)](https://github.com/overkilling/overkill-todo-spa-frontend)
- The business logic is a [Golang API](https://github.com/overkilling/overkill-todo-monolith-api)
- The persistence is a [Postgres database](https://www.postgresql.org/).

Below is colorful architecture diagram:

![Diagram](/.github/diagram.png?raw=true)

This is a fairly [standard architecture style](https://martinfowler.com/bliki/PresentationDomainDataLayering.html), and it could considered a good starting point for most applications.
If/when an application grows in complexity and features, other patterns could be considered, such as microservices, event sourcing, CQRS and many more.
Hopefully these other patterns will be explored in other overkill implementations, so they can be evaluated and compared.

In this simple architecture, the SPA and API components where implemented in a slighlty overkill fashion.
This means that, even though the problem space can be considered quite simple, the solution has been overengineered to exercise and highlight certain techniques and methodologies.
E.g. both `BasicAuth` and `JWT` authentication methods will be supported, it will include REST and `GraphQL` APIs, logs and metrics will be gathered.
The intent is to provide some practice to the developer and, perhaps, some education to the readers.

Although this repository only contains the SPA component, there's an [infrastructure repository](https://github.com/overkilling/overkill-todo-infrastructure) which ties the whole application together.
It allows to start the application locally through `docker-compose`, but it doesn't deploy it yet to any real environment.

## Getting started

To get started with the SPA, clone the codebase to your local environment and install all prequisites:

```
git clone git@github.com:overkilling/overkill-todo-spa-frontend.git
cd overkill-todo-spa-frontend
yarn install
```

### Running the application

There are a few ways of running the application, from a quick and dirty way to running the "full stack".

To quickly start the application from the cloned code, you can run the following (assuming you have a backend API and database already running):

```
yarn start
```

It is possible to also run it through docker, in a similar way that will be used in the [infrastructure repository](https://github.com/overkilling/overkill-todo-infrastructure).
The commands to build and run the image are:

```
docker build -t todo-spa .
docker run -p 80:80 todo-spa
```

There is also the [infrastructure repository](https://github.com/overkilling/overkill-todo-infrastructure), which contains instructions and code to run the whole application locally, including the backend, database and the observability stack (`fluentd`, `elasticsearch`, etc).
For more info, checkout the repo.

### Testing

There three levels of tests: unit, end to end and pact tests. None of them require a running API or database.

To run all tests

```
yarn ci
```

#### Unit tests

To run all unit tests:

```
yarn test
```

To watch file changes and run only the relevant tests:

```
yarn test-watch
```

#### End to end

End to end tests are run using [Cypress](https://www.cypress.io/).

To run all end to end tests:

```
yarn cypress:run
```

To open the Cypress browser, allowing to run and observe individual tests:

```
yarn cypress:open
```

#### Pact

To run the consumer side of the pact tests:

```
yarn pact
```

The above command will also generate a consumer contract in the `pacts` directory, which can be used by providers (that is, the backend API) to ensure they fulfil the contract.
Currenlty, the backend API will use https://raw.githubusercontent.com/overkilling/overkill-todo-infrastructure/master/pacts/spa-api.json as the contract.
Ideally a Pact Broker could be used, to mediate the valid consumer and provider versions.

### Storybook

For prototyping and visualizing individual components, a [Storybook](https://storybook.js.org/) is also available.
It can be accessed by running:

```
yarn storybook
```

### Github Actions

The Continuous Integration (CI) tooling used in this project is [Github Actions](https://github.com/features/actions), mainly because it's free and easy to use.

The CI workflow, defined `.github/workflows/ci.yml`, is:

- On `master` and PR branches: download dependencies and run all tests (`yarn ci`)
- On `master` only: after the tests pass, build and publish a Docker image

After a new image is published, further actions are triggered in the [infrastructure](https://github.com/overkilling/overkill-todo-infrastructure) repository.

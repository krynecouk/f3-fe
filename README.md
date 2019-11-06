# f3 frontend application

## Getting Started

### Prerequisites

- node: >= 10.X
- npm: >= 6.X

### How to start

1. `npm start`
2. go to [localhost:3000](http://localhost:3000/)
3. login: hrbec/krpec111

> **Note**: if you have problem running `start` because of `Error: ENOSPC: System limit for number of file watchers`, run `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
> ([More info](https://github.com/gatsbyjs/gatsby/issues/11406)).

### How to build

`npm run build`

## Running the tests

### How to run tests

`npm test`

## Code Style

### How to format code

With Prettier Intellij plugin ([How to use Prettier plugin](https://www.jetbrains.com/help/idea/prettier.html)).

### How to use IntelliSense in `imports`

Intellij does not support `jsconfig` yet. In order to use IntelliSense, mark `src` folder as source folder
(Mark directory as/Resource root) and enable Use paths relative to the project, resource or sources roots in Settings | Editor | Code Style | JavaScript | Imports.
More info [here](https://intellij-support.jetbrains.com/hc/en-us/community/posts/360003454280-BaseURL-Support-in-Webstorm).

### How to use IntelliSense in test suites

In Preferences | Languages & Frameworks | JavaScript | Libraries, press Download..., select 'jest' from the list of available stubs, press Download and Install.

### File Naming Conventions

- React components: PascalCase (e.g. LoginScene)
- Other js files: kebab-case (e.g. fn-utils)

## Docker

### How to build docker image

1. change base url in `./.env.production`
2. `npm run build`
3. `docker build . -t dolycloud/f3:fe-<version>`

### How to run docker image

1. `docker run -p 8000:80 dolycloud/f3:fe-<version>`
2. go to [localhost:8000](http://localhost:8000/)

### How to login into Docker Hub

1. `docker login`
2. dolycloud/aschuliitsfilefullofourjstrash

### How to push docker image

1. `docker rmi dolycloud/f3:fe-<version>`
2. `docker build . -t dolycloud/f3:fe-<version>`
3. `docker push dolycloud/f3:fe-<version>`

## TODO

- localisation
- add styled-components?, css modules?
- hash history/catch-all routing?
- add build timestamp
- font replace link with component asset

## License

Copyright (c) 2019 Vonkovy doly, spol. s r.o.

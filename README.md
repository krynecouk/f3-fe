# f3 frontend application 
## Getting Started
### Prerequisites
- node: >= 10.X
- npm: >= 6.X 

### How to start
1. `npm start`
2. go to [localhost:3000](http://localhost:3000/)

> **Note**: if you have problem running `start` because of `Error: ENOSPC: System limit for number of file watchers`, run `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
([More info](https://github.com/gatsbyjs/gatsby/issues/11406)).

### How to build
`npm run build`

## Running the tests
### How to run tests
`npm test`

> **Note**: No test right now.

## Code Style
### How to format code
With Prettier Intellij plugin ([How to use Prettier plugin](https://www.jetbrains.com/help/idea/prettier.html)).

## Docker
### How to build docker image
1. `npm run build`
2. `docker build . -t f3-fe`

### How to run docker image
1. `docker run -p 8000:80 f3-fe`
2. go to [localhost:8000](http://localhost:8000/)

### How to push docker image
1. `docker rmi doly/f3-fe:<version>`
2. `docker build -t doly/f3-fe:<version> .`
3. `docker push doly/f3-fe:<version>`

## License
Copyright (c) 2019 Vonkovy doly, spol. s r.o.

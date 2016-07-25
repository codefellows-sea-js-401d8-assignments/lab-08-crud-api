Here's a basic HTTP server with a way to route different requests. Still in the process of getting my promise to parse the querystring and push it into the object as a response.

First, clone down the repo.

Next, install dependencies via `npm install`

Start the server with `node server`

Using HTTPie, type a command like `http GET :3000 text=anymessage`

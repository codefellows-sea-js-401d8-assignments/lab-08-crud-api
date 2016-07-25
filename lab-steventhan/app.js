'use strict';

const url = require('url');
const jsonParser = require('./lib/json_parser');
const Project = require('./lib/project');

let app = {};

app.projectsDatabase = {
  '2c45ede0-523a-11e6-b124-27e69760e669': {
    id: '2c45ede0-523a-11e6-b124-27e69760e669',
    projectName: 'My HNG',
    technology: ['Python (Flask)', 'SQL (MySQL + SQLAlchemy)', 'CSS (Bootstrap + Insignia bootstrap admin theme)', 'JavaScript (jQuery, WebSockets)', 'Nginx', 'Gunicorn', 'AWS EC2 ubuntu instance'],
    github: 'https://github.com/steventhan/my-hng'
  }
};

app.homepageGet = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.write('For project API, please go to /api/projects');
  res.end();
};

app.projectsGetAll = (req, res) => {
  let projectsArray = [];
  for (let key in app.projectsDatabase) {
    projectsArray.push(app.projectsDatabase[key]);
  }
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify(projectsArray));
  res.end();
};

app.projectsGetById = (req, res) => {
  let projectId = url.parse(req.url, true).query.id;
  let responseJson = {};
  if (projectId !== undefined) {
    if(app.projectsDatabase[projectId] !== undefined) {
      responseJson.status = 200;
      responseJson.msg = 'Success';
      res.writeHead(responseJson.status, {
        'Content-Type': 'text/plain'
      });
      res.write(JSON.stringify(app.projectsDatabase[projectId]));
    } else {
      responseJson.status = 404;
      responseJson.msg = 'Project id not found';
      res.writeHead(responseJson.status, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(responseJson));
    }
  } else {
    responseJson.status = 400;
    responseJson.msg = 'Bad request, please specify project id. For e.g \'projects?id=11111\'';
    res.writeHead(responseJson.status, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(responseJson));
  }
  res.end();
};

app.projectsPost = (req, res) => {
  let responseJson = {};
  jsonParser(req)
    .then((parsedJson) => {
      if (parsedJson.projectName !== undefined &&
          parsedJson.technology !== undefined &&
          parsedJson.github !== undefined) {
        let project = new Project(parsedJson.projectName, parsedJson.technology, parsedJson.github);
        while(app.projectsDatabase[project.id] !== undefined) {
          project.getNewId();
        }
        app.projectsDatabase[project.id] = project;
        responseJson.status = 200;
        responseJson.msg = 'Success';
        res.writeHead(responseJson.status, {
          'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(project));
      } else {
        responseJson.status = 400;
        responseJson.msg = 'Bad request, check your json';
        res.writeHead(400, {
          'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(responseJson));
      }
    }, (err) => {
      responseJson.status = 400;
      responseJson.msg = 'Error, ' + err.message;
      res.writeHead(responseJson.status, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(responseJson));
    }).then(() => {
      res.end();
    });
};

app.projectsDelete = (req, res) => {
  let projectId = url.parse(req.url, true).query.id;
  let responseJson = {};
  if(app.projectsDatabase[projectId] !== undefined) {
    delete app.projectsDatabase[projectId];
    responseJson.status = 204;
    responseJson.msg = 'Success';
    res.writeHead(responseJson.status, {
      'Content-Type': 'application/json'
    });
  } else {
    responseJson.status = 404;
    responseJson.msg = 'Project id not found';
    res.writeHead(responseJson.status, {
      'Content-Type': 'application/json'
    });
  }
  res.write(JSON.stringify(responseJson));
  res.end();
};

module.exports = app;

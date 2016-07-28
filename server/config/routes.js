/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import {controllers, passport as passportConfig} from '../db';
import request from "request";
import axios from 'axios';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const accountsController = controllers.accounts;
const repositoryController = controllers.repositories;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }

  // Accounts
  app.get('/api/accounts/:id', accountsController.get);
  app.get('/api/accounts', accountsController.all);
  app.post('/api/accounts/:id', accountsController.add);
  app.put('/api/accounts/:id', accountsController.update);
  app.delete('/api/accounts/:id', accountsController.remove);
  //Repositories
  app.get('/api/accounts/:id/repositories', repositoryController.allRepos);
  app.get('/api/accounts/:acctId/repositories/:id', repositoryController.getRepo);
  app.post('/api/accounts/:id/repositories', repositoryController.addRepo);
  app.delete('/api/accounts/:id/repositories/:repoId', repositoryController.removeRepo);
  app.get('/api/accounts/:acctId/repositories/:id/sync', repositoryController.syncRepo);
  //Comparisons
  app.get('/api/accounts/:acctId/repositories/:repoId/comparisons', repositoryController.getAllComp);
  app.get('/api/accounts/:acctId/repositories/:repoId/comparisons/:id', repositoryController.getComp);
  app.post('/api/accounts/:acctId/repositories/:repoId/comparisons', repositoryController.addComp);
  app.post('/api/accounts/:acctId/repositories/:repoId/comparisons/:id/start', repositoryController.startComp);
  app.post('/api/accounts/:acctId/repositories/:repoId/comparisons/:id/stop', repositoryController.stopComp);

  app.get('/proxy/:domain/:port/*', (req, res) => {
    console.log(req.params);
    const path = req.params['0'] ? `/${req.params['0']}` : '';
    const url = `http://${req.params.domain}:${req.params.port}${path}`;

    request(url).pipe(res);
    // console.log(url);
    //
    // axios.get(url).then((content) => {
    //   console.log(content);
    //   // content = content.data + `<base href="http://localhost:8000" />`
    //   res.send(content.data);
    // });
  })
};

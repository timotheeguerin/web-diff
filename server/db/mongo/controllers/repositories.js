import _ from 'lodash';
import Account from '../models/account';
import Repository from '../models/Repository';

var fs = require('fs-extra');
var dir = './repo';

/**
 * List all repositories
 */
export function allRepos(req, res) {

  console.log("Testing repos for " + req.params.id);
  Account.findById(req.params.id).exec((err, data) => {
    if (err) {
      console.log('Error on save!');
      return res.status(500).send('We failed to save for some reason');
    }
    console.log(data);
    return res.json(data.repositories);
  });
}

/**
 * Add repo to account
 */
export function addRepo(req, res) {
  const query = {_id: req.params.id};

  const repo = new Repository();
  repo.name = req.body.name;
  repo.url = req.body.url;

  Account.update(query, {"$push": {repositories: repo}}, (err, data) => {
    if (err) {
      console.log('Error on save!');
      return res.status(500).send('We failed to save for some reason');
    }
    return res.status(201).json(repo);
  });
}

/**
 * Add repo to account
 */
export function removeRepo(req, res) {
  console.log(req.params.repoId);
  Account.update({_id: req.params.id}, {"$pull": {repositories: {_id: req.params.repoId}}}, (err, data) => {
    if (err) {
      console.log('Error on save!');
      return res.status(500).send('We failed to save for some reason');
    }

    return res.status(200).send('Updated successfully');
  });
}

/**
 * Sync all repositories
 */
export function syncRepo(req, res) {

  var message = "Refreshing repository" + req.params.id + "for account: " + req.params.acctId;
  var repositoryFolder = dir + '/' + req.params.acctId + "-" + req.params.id;

  fs.mkdirs(repositoryFolder, function (err) {
    if (err) return console.error(err)
    console.log("success!")
  }).then(()=> {
    require('simple-git')(repositoryFolder)
      .clone("https://github.com/mateialexandru/git-reflections")
      .log(function (err, log) {
        message = log;
        return res.json(message);
      });
  });
}

export default {
  allRepos,
  addRepo,
  removeRepo,
  syncRepo
};

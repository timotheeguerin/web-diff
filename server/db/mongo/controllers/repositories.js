import _ from 'lodash';
import Account from '../models/account';
import Repository from '../models/repository';

var fs = require('fs-extra');
var dir = './repo';

/**
 * List all repositories
 */
export function allRepos(req, res) {
  Account.findById(req.params.id).exec((err, data) => {
    if (err) {
      console.log('Error on save!');
      return res.status(500).send('We failed to save for some reason');
    }
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
export function getRepo(req, res) {
    Account.findById(req.params.acctId).exec((err,account) => {
       return res.json(account.repositories.id(req.params.id));
    });
}

/**
 * Remove repo from account
 */
export function removeRepo(req, res) {
  console.log(req.params.repoId);
  Account.update({_id: req.params.id}, {"$pull": {repositories: {_id: req.params.repoId}}}, (err, data) => {
    if (err) {
      console.log('Error on save!'+err);
      return res.status(500).send('We failed to save for some reason');
    }

    return res.status(200).send('Updated successfully');
  });
}

/**
 * Sync all repositories
 */
export function syncRepo(req, res) {

    var repoId = req.params.id;
    var accountId = req.params.acctId;
    var repositoryFolder = dir+'/'+accountId+"-"+repoId;
    console.log("Blah!!!");
    Account.findById(accountId).exec((err,account) => {
        var repository = account.repositories.id(repoId);
        var url= repository.url;
        fs.mkdirs(repositoryFolder, function (err) {
            if (err) return console.error(err)
            console.log("success!")
        });
        require('simple-git')().clone(url,repositoryFolder).then(()=>
        {
            require('simple-git')(repositoryFolder)
                .log(function(err, log) {
                    console.log('update acct '+ accountId + 'update repo' + repoId);
                    Account.update(
                        {_id:accountId,"repositories._id":repoId},
                        {"$set":{"repositories.$.revisions":log.all}}).exec((err,data)  => {
                        if (err) {
                            console.log('Error on save!'+err);
                            return res.status(500).send('We failed to save for some reason:'+ err);
                        }
                        console.log(data);
                        return res.status(200).send('Updated successfully');
                    });
                });
        })
    });
}

export default {
    allRepos,
    addRepo,
    getRepo,
    removeRepo,
    syncRepo
};

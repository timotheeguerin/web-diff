import _ from 'lodash';
import Account from '../models/account';
import Repository from '../models/repository';

var fs = require('fs-extra');
var dir = './repo';

/**
 * List all repositories
 */
export function allRepos(req, res) {
  Account.findById(req.params.id).exec((err, account) => {
    if (err) {
      console.log('Error on save!');
      return res.status(500).send('We failed to save for some reason');
    }
    if(account) {
      return res.json(account.repositories);
    } else {
      return res.status(404).send("Account doesn't exists!");
    }
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
      if(account) {
       return res.json(account.repositories.id(req.params.id));
      } else {
        return res.status(404).send("Account doesn't exists!");
      }
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
    var repositoryFolder = dir+'/'+accountId+"/"+repoId+"/"+"base";
    console.log("Blah!!!");
    Account.findById(accountId).exec((err,account) => {
        var repository = account.repositories.id(repoId);
        var url= repository.url;
        if(fs.existsSync(repositoryFolder)){
            require('simple-git')(repositoryFolder)
                .fetch()
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
        }
        else{
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
        }
    });
}

/**
 * Add comparison to repository
 */
export function addComp(req, res) {
    var acctId = req.params.acctId;
    var repoId = req.params.repoId;
    var toUpdate = req.body;
    toUpdate.target.state="stopped";
    toUpdate.base.state="stopped";
        Account.update(
            {_id:acctId,"repositories._id":repoId},
            {"$push":{"repositories.$.comparisons":req.body}}).exec((err,data)  => {
            if (err) {
                console.log('Error on save!'+err);
                return res.status(500).send('We failed to save for some reason:'+ err);
            }
            return res.status(200).send('Updated successfully');
        });
}

/**
 * Get comparison from repository
 */
export function getComp(req, res) {
    var acctId = req.params.acctId;
    var repoId = req.params.repoId;
    var id = req.params.id;

    Account.findById(acctId).exec((err,account) => {
        return res.json(account.repositories.id(repoId).comparisons.id(id));
    });
}

/**
 * Get all comparisons from repository
 */
export function getAllComp(req, res) {
    var acctId = req.params.acctId;
    var repoId = req.params.repoId;
    var id = req.params.id;

    Account.findById(acctId).exec((err,account) => {
        return res.json(account.repositories.id(repoId).comparisons);
    });
}

function tryCloneRepo(url,folder,hash){
    if (fs.existsSync(folder)) {
        return require('simple-git')(folder)
            .checkout(hash)
    }else{
        return require('simple-git')()
            .clone(url,folder)
            .checkout(hash)
    }
}

/**
 * Start comparison from repository (should work)
 */
export function startComp(req, res) {

    var sys = require('sys'), exec = require('child_process').exec;

    var acctId = req.params.acctId;
    var repoId = req.params.repoId;
    var compId = req.params.id;

    console.log('CompId'+compId);

    Account.findById(acctId).exec((err,account) => {
        var repo = account.repositories.id(repoId)
        var comparison = account.repositories.id(repoId).comparisons.id(compId);
        var hash1 = comparison.target.hash;
        var hash2 = comparison.base.hash;

        var comparisonFolder = dir + '/' + acctId + "/" + repoId + "/comparisons";

        var folder1 = comparisonFolder+'/'+hash1;
        tryCloneRepo(repo.url,folder1,hash1).then(()=>{
            exec("npm install",{cwd: folder1},function(err, stdout, stderr){
                console.log()
                console.log(err + stdout + stderr)
            });

            exec("npm run dev 3001",{cwd: folder1},function(err, stdout, stderr){
                    console.log(err + stdout + stderr)
            });

            return res.status(200).send("Start successfully!");
        });
        var folder2 =comparisonFolder+'/'+hash2;
        tryCloneRepo(repo.url,folder2,hash2).then(()=>{
            exec("npm install",{cwd: folder2},function(err, stdout, stderr){
                console.log(err + stdout + stderr)
            });

            exec("npm run dev 3002",{cwd: folder1},function(err, stdout, stderr){
                    console.log(err + stdout + stderr)
            });

            return res.status(200).send("Start successfully!");
        });
    });
}

/**
 * Stop comparison from repository (in progress)
 */
export function stopComp(req, res) {
    var acctId = req.params.acctId;
    var repoId = req.params.repoId;
    var compId = req.params.id;

    console.log('CompId'+compId);

    Account.update(
        {_id:acctId,
            "repositories._id":repoId,
            "repositories.comparisons._id":compId
        },
        {"$set":{"repositories.comparisons.$$.target.state":"stopped"}}).exec((err,data)  => {
        if (err) {
            console.log('Error on save!'+err);
            return res.status(500).send('We failed to save for some reason:'+ err);
        }
        return res.status(200).send('Updated successfully');
    });
}
export default {
    allRepos,
    addRepo,
    getRepo,
    removeRepo,
    syncRepo,
    addComp,
    getComp,
    getAllComp,
    startComp,
    stopComp
};

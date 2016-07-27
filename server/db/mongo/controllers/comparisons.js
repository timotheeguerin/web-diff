import _ from 'lodash';
import Account from '../models/account';
import Repository from '../models/repository';

var fs = require('fs-extra');

/**
 * Add a comparison to a repository
 */
export function addComp(req, res) {
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
 * Get comparison
 */
export function getComp(req, res) {
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
 * Get all comparisons
 */
export function getComps(req, res) {
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
export default {
    addComp,
    getComp,
    getComps
};

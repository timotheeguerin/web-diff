import _ from 'lodash';
import Account from '../models/account';

/**
 * List
 */
export function all(req, res) {
  Account.find({}).exec((err, accounts) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(accounts);
  });
}

/**
 * Get
 */
export function get(req, res) {
  console.log(req.params.id);
  Account.findById(req.params.id).exec((err,data) => {
    console.log(err);
    console.log(data);
    if (err) {
      console.log('Error on save!' + err);
      return res.status(500).send('We failed to save for some reason'+ err);
    }
    return res.json(data);
  });
}

/**
 * Add a Account
 */
export function add(req, res) {
  Account.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}

/**
 * Update a Account
 */
export function update(req, res) {
  const query = { id: req.params.id };
  const isIncrement = req.body.isIncrement;
  const isFull = req.body.isFull;
  const omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  const data = _.omit(req.body, omitKeys);

  if (isFull) {
    Account.findOneAndUpdate(query, data, (err) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
  } else {
    Account.findOneAndUpdate(query, { $inc: { count: isIncrement ? 1 : -1 } }, (err) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
  }
}

/**
 * Remove a Account
 */
export function remove(req, res) {
  const query = { id: req.params.id };
  Account.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  all,
  add,
  get,
  update,
  remove
};

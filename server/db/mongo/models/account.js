/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import {RepositorySchema} from './repository';

const AccountSchema = new mongoose.Schema({
  name: String,
  repositories: [RepositorySchema]
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Account', AccountSchema);


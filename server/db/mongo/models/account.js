/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import Repository from './repository';

const AccountSchema = new mongoose.Schema({
  id: String,
  name: String,
  repositories: [Repository]
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Account', AccountSchema);


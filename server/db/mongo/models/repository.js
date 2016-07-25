/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const RepositorySchema = new mongoose.Schema({
  id: String,
  url: String,
  name: String
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Repository', RepositorySchema);
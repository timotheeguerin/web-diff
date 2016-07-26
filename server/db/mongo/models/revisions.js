/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

export const RevisionsSchema = new mongoose.Schema({
  hash: String,
  message: String,
  author_name: String,
  author_email: String,
  date: Date
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Revision', RevisionsSchema);
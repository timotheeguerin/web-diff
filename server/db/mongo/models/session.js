/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

export const SessionsSchema = new mongoose.Schema({
  hash: String,
  name:String,
  message: String,
  port: String,
  url: String,
  state: String
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Session', SessionsSchema);
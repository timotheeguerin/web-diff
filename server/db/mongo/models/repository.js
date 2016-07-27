/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import {RevisionsSchema} from './revisions';
import {ComparisonSchema} from './comparison';
export const RepositorySchema = new mongoose.Schema({
  url: String,
  name: String,
  revisions: [RevisionsSchema],
  comparisons: [ComparisonSchema]
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Repository', RepositorySchema);
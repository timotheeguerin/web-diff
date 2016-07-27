/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

import {SessionsSchema} from './session';

export const ComparisonSchema = new mongoose.Schema({
  name:String,
  base: SessionsSchema,
  target: SessionsSchema
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Comparison', ComparisonSchema);
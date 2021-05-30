import { ObjectId } from 'bson';

export class Document {
  _id: ObjectId;
}

/* tslint:disable:max-classes-per-file */
export abstract class TimestampDocument extends Document {
  createdAt: Date;
  updatedAt?: Date;
}

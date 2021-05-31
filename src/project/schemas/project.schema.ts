import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TimestampDocument } from '../../shared/classes/mongo/document.class';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project extends TimestampDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  @Prop({ required: false })
  image: string;
}

export const projectSchema = SchemaFactory.createForClass(Project);

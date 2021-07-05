import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TimestampDocument } from '../../shared/classes/mongo/document.class';
import { Document, ObjectId } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project extends TimestampDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  @Prop({ required: true })
  collaborators: string[];

  @Prop({ required: false })
  image: string;
}

export const projectSchema = SchemaFactory.createForClass(Project);

// export type ProjectsCollaboratorsDocument = ProjectsCollaborators & Document;
// @Schema()
// export class ProjectsCollaborators extends TimestampDocument {
//   @Prop({ required: true })
//   user: ObjectId;

//   @Prop({ required: true })
//   project: string;
// }

// export const ProjectsCollaboratorsSchema = SchemaFactory.createForClass(Project);

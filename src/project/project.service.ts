import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(@InjectModel('Project') private readonly projectModel: Model<ProjectDocument>) {}

  create(userId: string, createProjectDto: CreateProjectDto): any {
    const project = new this.projectModel({
      name: createProjectDto.name,
      startAt: createProjectDto.startAt,
      endAt: createProjectDto.endAt,
      image: '',
      createdAt: new Date(),
      createdBy: userId
    });

    project.save();
    return 'project added';
  }

  async findAll(): Promise<any> {
    const data = await this.projectModel.find().exec();
    return data;
  }

  async findOne(id: string): Promise<any> {
    let project: any;
    try {
      project = await this.projectModel.findById(id).exec();
    } catch (error) {
      console.log(id);
      throw new NotFoundException('Could not find project.');
    }

    if (!project) {
      throw new NotFoundException('Could not find project.');
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<any> {
    const project = await this.findOne(id);

    project.name = updateProjectDto.name;
    project.startAt = updateProjectDto.startAt;
    project.endAt = updateProjectDto.endAt;

    try {
      project.save();
    } catch (error) {
      throw new NotFoundException(error);
    }

    return `project updated`;
  }

  async remove(id: string): Promise<any> {
    const result = await this.projectModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find project.');
    }
    return `deleted`;
  }
}

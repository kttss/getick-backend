import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(@InjectModel('Project') private readonly projectModel: Model<ProjectDocument>) {}

  create(userId: string, createProjectDto: CreateProjectDto): any {
    const project = new this.projectModel({
      name: createProjectDto.name,
      description: createProjectDto.description,
      startAt: createProjectDto.startAt,
      endAt: createProjectDto.endAt,
      image: '',
      createdAt: new Date(),
      createdBy: userId,
      board: createProjectDto.board,
      collaborator: []
    });

    project.save();
    return { message: 'added' };
  }

  async addCollabToProject(collab: string, project: string): Promise<any> {
    const pro = await this.projectModel.findById(project).exec();
    pro.collaborators.push(collab);
    pro.save();
    return { message: 'done' };
  }

  async findAll(userId: string): Promise<any> {
    const data = await this.projectModel.find({ createdBy: userId }).exec();
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

  async getBoard(id: string): Promise<any> {
    let project: any;
    try {
      project = await this.projectModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find project.');
    }

    if (!project) {
      throw new NotFoundException('Could not find project.');
    }
    return JSON.parse(project.board);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<any> {
    const project = await this.findOne(id);

    project.name = updateProjectDto.name;
    project.description = updateProjectDto.description;
    project.startAt = updateProjectDto.startAt;
    project.endAt = updateProjectDto.endAt;

    try {
      project.save();
    } catch (error) {
      throw new NotFoundException(error);
    }

    return { message: `project updated` };
  }

  async updateBoard(id: string, updateBoardDto: UpdateBoardDto): Promise<any> {
    const project = await this.findOne(id);
    project.board = updateBoardDto.board;

    try {
      project.save();
    } catch (error) {
      throw new NotFoundException(error);
    }

    return { message: `Board updated` };
  }

  async remove(id: string): Promise<any> {
    const result = await this.projectModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find project.');
    }
    return `deleted`;
  }
}

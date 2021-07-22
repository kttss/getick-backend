import { Controller, Get, Request, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UpdateBoardDto } from './dto/update-board.dto';

@ApiTags('project')
@ApiBearerAuth()
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req: any, @Body() createProjectDto: CreateProjectDto): any {
    return this.projectService.create(req.user.userId, createProjectDto);
  }

  @Get('invite')
  invite(@Param('project') projectId: string, @Param('collab') collabId: string): any {
    return this.projectService.addCollabToProject(collabId, projectId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: any): any {
    return this.projectService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.projectService.findOne(id);
  }

  @Get('getBoard/:id')
  getBoard(@Param('id') id: string): any {
    return this.projectService.getBoard(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): any {
    return this.projectService.update(id, updateProjectDto);
  }

  @Post('updateboard/:id')
  updateBoard(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto): any {
    return this.projectService.updateBoard(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.projectService.remove(id);
  }
}

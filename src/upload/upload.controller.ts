import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';

@ApiTags('ged')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './ged/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${file.originalname}`);
        }
      })
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File): any {
    return { file: file.filename };
  }

  @Get('read/:filename')
  async serveAvatar(@Param('filename') filename: string, @Res() res: any): Promise<any> {
    res.sendFile(filename, { root: 'ged' });
  }
}

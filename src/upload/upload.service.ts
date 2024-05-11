import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';


@Injectable()
export class UploadService {
  constructor(private readonly configService:ConfigService){}

  


  private readonly s3Client=new S3Client({
    credentials:{
      accessKeyId:this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey:this.configService.get('AWS_SECRET_ACCESS_KEY')

    },
    region:this.configService.get('AWS-S3-REGION')
  })


  async upload(fileName:string,data:Buffer) {
    const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
  
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName, // Replace with actual file name
      Body: data, // Replace with actual file content (e.g., buffer)
    });

    await this.s3Client.send(command);
  }


}

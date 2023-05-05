import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    create(file: any, createUploadDto: CreateUploadDto): Promise<import("./entities/upload.entity").Upload>;
}

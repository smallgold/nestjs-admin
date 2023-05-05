import { Upload } from 'src/upload/entities/upload.entity';
import { Repository } from 'typeorm';
export declare class UploadService {
    private readonly uploadRepository;
    constructor(uploadRepository: Repository<Upload>);
    create(file: any): Promise<Upload>;
    remove(fileId: string): string;
}

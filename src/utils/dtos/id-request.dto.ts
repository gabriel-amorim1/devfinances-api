import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdRequestDTO {
    @IsUUID()
    @IsNotEmpty()
    readonly id: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Upload {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fileName: string

    @Column()
    fileLinkInS3: string
}

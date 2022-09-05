const { 
    Entity, 
    BaseEntity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    Unique, 
    BeforeInsert, 
    Generated, 
    AfterInsert 
} = require("typeorm");

// import { v4 as uuid} from 'uuid'

@Entity()
@Unique(['url', 'selectors'])
export class Field extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    // @Column({ type: 'uuid'})
    // @Generated('uuid')
    // uuid: string

    @Column({ 
        length: 200,
        nullable: true,
    })
    type: string;

    @Column({ length: 255 })
    domain: string;

    @Column()
    url: string

    @Column("text")
    selectors: string;
    // selectors: string[];

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    
    // @BeforeInsert()
    // createUuid() {
    //     this.uuid = uuid(); 
    // }

    // incase we dont want to be returning ID in requests and use UUID for all queries instead
    // toJSON() {
    //     return { ...this, id: undefined }
    // }
}

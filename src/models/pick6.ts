const { Entity, BaseEntity,  Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, Generated, AfterInsert } = require("typeorm");
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator";

// import { v4 as uuid} from 'uuid'

@Entity("pick6_registrations")
export class Pick6 extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    // @Column({ type: 'uuid'})
    // @Generated('uuid')
    // uuid: string

    @Column()
    @IsEmail()
    email: string;

    @Column({ type: "json", nullable: true })
    subscribers: { firstName: string, lastName: string };

    @Column("text", {array: true})
    subscription: string[];

    @Column({ nullable: true })
    price: number;

    @Column({ default: false })
    isRegistered: boolean;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    
    // @BeforeInsert()
    // createUuid() {
    //     this.uuid = uuid(); 
    // }

    @BeforeInsert()
    registered() {
        this.isRegistered = true;
    }

    // incase we dont want to be returning ID in requests and use UUID for all queries instead
    // toJSON() {
    //     return { ...this, id: undefined }
    // }
}

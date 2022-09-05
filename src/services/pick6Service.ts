import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Pick6} from "../models/pick6";


export interface Pick6Request {
    email: string;
    subscribers: { firstName: string, lastName: string };
    subscription: string[];
    price?: number;
    isRegistered: boolean;
}

export interface ICreatePick6Request {
    email: string;
    subscribers: { firstName: string, lastName: string };
    subscription: string[];
}

export interface IUpdatePick6Request {
    subscription: string[];
    subscribers: { firstName: string, lastName: string };
    email: string;
}

export class Pick6Service {
    private pick6Repository = getRepository(Pick6);

    public async getPick6(
        id?: number,
        showCompleted?: boolean): Promise<Pick6[]> {
        if (id)
        {  
            try {
                let pick6ToFetch = await this.pick6Repository.find({ id:id });
                return pick6ToFetch;
            } catch (err) {
                console.log(err);
                throw new Error("Invalid Input");
            }
        }
        else if (showCompleted)
        {
            try {
                let pick6ToFetch = await this.pick6Repository.find({ isRegistered: showCompleted });
                return pick6ToFetch;
            } catch (err) {
                console.log(err);
                throw new Error("Invalid Input");
            }
        }
        else
        {
            return this.pick6Repository.find();
        }
    }

    // public async getPick6ById(id: number): Promise<Pick6> {
    //     return this.pick6Repository.findOneOrFail(id);
    // }

    public async createPick6(requestBody: ICreatePick6Request): Promise<Pick6> {
        // calling create inside save helps us trigger the isRegistered @BeforeInsert() event 
        // listener in our pick6 model
        return this.pick6Repository.save(
            this.pick6Repository.create(requestBody));
    }

    public async deletePick6(id: number): Promise<void> {
        let pick6ToRemove = await this.pick6Repository.findOne(id);
        if (!pick6ToRemove) throw new Error('Invalid Input');
        await this.pick6Repository.remove(pick6ToRemove);
    }

    public async updatePick6(id: number, requestBody): Promise<Pick6> {          
        try {
            // let one = await this.pick6Repository.findOneOrFail(id);
            // await this.pick6Repository.update({id: id}, requestBody);
            await this.pick6Repository.update(id, { ...requestBody });
            let updatedPick6 = await this.pick6Repository.findOneOrFail(requestBody);
            return updatedPick6;
        } catch (err) {
            console.log(err);
            throw new Error("Invalid Input");
        }
    }
}
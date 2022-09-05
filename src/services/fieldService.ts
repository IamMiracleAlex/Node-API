import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Field} from "../models/field";

export interface ICreateFieldRequest {
    domain: string;
    url: string;
    selectors: string;
}

export interface FieldRequest {
    type: string;
    domain: string;
    url: string;
    selectors: string;
}

export class FieldService {
    private fieldRepository = getRepository(Field);

    // public async getFields(): Promise<Field[]> {
    //     return this.fieldRepository.find();
    // }

    // public async getFieldById(id: number): Promise<Field> {
    //     return this.fieldRepository.findOneOrFail(id);
    // }

    public async getFieldByDomain(domain: string): Promise<Field[]> {
        try {
            let DomainsToFetch = this.fieldRepository.find({ domain: domain });
            return DomainsToFetch;
        } catch (err) {
                console.log(err);
                throw new Error("Invalid Input");
        }
    }

    public async createField(requestBody: FieldRequest): Promise<Field>{
        return this.fieldRepository.save(
            this.fieldRepository.create(requestBody));
    }

    public async deleteField(id: number): Promise<void> {
        let fieldToRemove = await this.fieldRepository.findOne(id);
        if (!fieldToRemove) throw new Error('Invalid Input');
        await this.fieldRepository.remove(fieldToRemove);
    }

    public async updateField(id: number, requestBody): Promise<Field> {          
        try {
            // await this.pick6Repository.findOneOrFail(request.params.id);
            await this.fieldRepository.update({id: id}, { ...requestBody });
            let updatedField = await this.fieldRepository.findOneOrFail(requestBody)
            return updatedField;
        } catch (err) {
            console.log(err);
            throw new Error("Invalid Input");
        }
    }
    
}

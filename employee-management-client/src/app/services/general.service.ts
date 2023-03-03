import { Observable } from "rxjs";

export interface GeneralService {
    getByQuery(query: string): any;
    getAll(): any;
    getById(id: number): any;
}
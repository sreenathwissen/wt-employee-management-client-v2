import { Client } from "./client.model"

export interface Project {
    client: Client;
    projectId: number;
    projectLead: string;
    projectLocation: string;
    projectName: string;
    projectType: string;
}
import { IClient } from "../client-details/IClient";

export interface IProject {
    projectId: number;
    projectName: string;
    projectLocation: string;
    projectLead: string;
    projectType: string;
    clientId: number;
}
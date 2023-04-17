import { environment } from "src/environments/environment";

export namespace Constants {

    /******* BASE URL *************/
    export const BASE_URL = environment.baseUrl + "api";

    /******* PROJECT URL *************/
    export const PROJECT_URL = "/project";
    export const CLIENT_URL = "/client";
    export const EMPLOYEE_URL = "/employee";
    export const SKILL_URL = "/skill"
    export const EMPLOYEE_PROJECT_URL = "/projectEmployeeMapping";
    export const ALL_CLIENTS = "/allClients";
    export const ALL_PROJECTS = "/allProjects";
    export const SEARCH_CLIENT = "/search?clientName=";
    export const SEARCH_EMPLOYEE = "/search?searchString=";
    export const SEARCH_PROJECTS = "/search?projectName=";
    export const SEARCH_EMPLOYEE_PROJECT = "/employee?empId=";

}
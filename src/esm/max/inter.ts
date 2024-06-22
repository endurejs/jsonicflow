/* 
will seperate to class - interface
interface file

exporting interface : non-default
*/

export interface ICreateDatabaseClass {
    name: (nr: string) => IRealNameJsonFlowClass;
}

export interface IRealNameJsonFlowClass {
    createDatabase: (name: string) => IJsonTableClass;
}

export interface IJsonTableClass {
    createTable: (nvr: string, {}:{}) => IJsonicTableSet
}

export interface IJsonicTableSet {}

type tableInsert =
    "NOT" |
    "NULL" |
    "KEY" |
    "PRIMARY" |
    "FOREIGN" |
    "UNIQUE" |
    "AUTO_INCREMENT"
;


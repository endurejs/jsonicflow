/* reach file */
export { JsonicFlow as jsonicflow };

import * as fs from 'fs';
import { ICreateDatabaseClass, IRealNameJsonFlowClass, IJsonTableClass, IJsonicTableSet } from './inter';

class JsonicFlow {
    static init(): ICreateDatabaseClass {
        return new CreateDatabaseClass();
    }
}

class CreateDatabaseClass implements ICreateDatabaseClass {
    name(nr: string): IRealNameJsonFlowClass {
        const k: Record<string, any> = {};
        const j = JSON.stringify(k, null, 4);

        if (!fs.existsSync(nr)) {
            fs.mkdirSync(nr);
            fs.writeFileSync(`${nr}/types.json`, j, "utf-8");
            fs.writeFileSync(`${nr}/values.json`, j, "utf-8");
        } else {
            throw new Error("file already exist.");
        }

        return new RealNameJsonFlowClass(k, nr); // 전달할 객체를 생성자에 전달
    }
}

class RealNameJsonFlowClass implements IRealNameJsonFlowClass {
    constructor(private namer: Record<string, any>, private nr: string) {}

    createDatabase(nr: string): IJsonTableClass {
        if (!(nr in this.namer)) {
            this.namer[nr] = {};

            // types.json 및 values.json 파일의 현재 내용을 읽어옴
            const typesPath = `${this.nr}/types.json`;
            const valuesPath = `${this.nr}/values.json`;
            const typesContent = JSON.parse(fs.readFileSync(typesPath, "utf-8"));
            const valuesContent = JSON.parse(fs.readFileSync(valuesPath, "utf-8"));

            // 내용 수정
            typesContent[nr] = {};
            typesContent["use"] = false; // types.json에만 추가
            valuesContent[nr] = {};

            // 수정된 내용을 파일에 다시 씀
            fs.writeFileSync(typesPath, JSON.stringify(typesContent, null, 4), "utf-8");
            fs.writeFileSync(valuesPath, JSON.stringify(valuesContent, null, 4), "utf-8");
        }
        
        else {
            throw new Error("db already exist");
        }

        return new JsonTableClass(this.namer, this.nr, nr);
    }
}


class JsonTableClass implements IJsonTableClass {
    constructor(private nmr: Record<string, any>, private nnr: string, private supernr: string) {}
    
    use() {
        const tp = `${this.nnr}/types.json`;
        const tc = JSON.parse(fs.readFileSync(tp, "utf-8"));
        let uses: boolean = tc.use;
        
        if (uses !== false) {
            throw new Error("db already used");
        }
        
        else {
            uses = true;
        }
    }

    unuse() {
        const tp = `${this.nnr}/types.json`;
        const tc = JSON.parse(fs.readFileSync(tp, "utf-8"));
        let uses: boolean = tc.use;
        
        if (uses !== true) {
            throw new Error("db not used");
        }
        
        else {
            uses = false;
        }
    }

    createTable(nvr: string, {}: {}): IJsonicTableSet {
        // const tp = `${this.nnr}/types.json`;
        // const tc = JSON.parse(fs.readFileSync(tp, "utf-8"));
        // const db = tc[this.supernr];

        // if (!(nvr in db)) {

        // }

        return new JsonicTableSet(nvr);
    }
}

class JsonicTableSet {
    constructor(private nvnr: string) {}
}
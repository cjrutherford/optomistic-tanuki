import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

export declare type AuthConfigType = {
        listenPort: number;
        database: {
                host: string;
                port: number;
                username: string;
                password: string;
                database: string;
        };
        auth: {
                jwt_secret: string;
        }
}

const loadConfig = () => {
        const configPath = path.resolve(__dirname, './assets/config.yaml');
        const configFile = fs.readFileSync(configPath, 'utf8');
        return yaml.load(configFile) as AuthConfigType;
};

export default loadConfig;
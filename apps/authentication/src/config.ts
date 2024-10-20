import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

const loadConfig = () => {
        const configPath = path.resolve('./apps/authentication/config.yaml');
        const configFile = fs.readFileSync(configPath, 'utf8');
        return yaml.load(configFile) as Record<string, any>;
};

export default loadConfig;
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import loadConfig from './config';

jest.mock('fs');
jest.mock('path');
jest.mock('js-yaml');

describe('loadConfig', () => {
    const mockConfigPath = '/mocked/path/config.yaml';
    const mockConfigFile = 'mocked config file content';
    const mockConfig = { key: 'value' };

    beforeEach(() => {
        (path.join as jest.Mock).mockReturnValue(mockConfigPath);
        (fs.readFileSync as jest.Mock).mockReturnValue(mockConfigFile);
        (yaml.load as jest.Mock).mockReturnValue(mockConfig);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should read the config file from the correct path', () => {
        loadConfig();
        expect(path.resolve).toHaveBeenCalledWith('config.yaml');
        expect(fs.readFileSync).toHaveBeenCalledWith(path.resolve('src/config.yaml'), 'utf8');
    });

    it('should parse the config file content as YAML', () => {
        const config = loadConfig();
        expect(yaml.load).toHaveBeenCalledWith(mockConfigFile);
        expect(config).toEqual(mockConfig);
    });
});
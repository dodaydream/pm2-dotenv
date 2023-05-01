// __tests__/pm2-dotenv.test.js
const fs = require('fs');
const { _loadAllEnvs, _getEnvs } = require('../index');

describe('_loadAllEnvs', () => {
  const originalCwd = process.cwd();

  beforeEach(() => {
    // Create temporary directory for test files
    const tmpPath = fs.mkdtempSync('test-');
    process.chdir(tmpPath);

    // Create temporary .env.<environment> files
    fs.writeFileSync('.env.test1', 'APP1_KEY1=value1\nAPP1_KEY2=value2');
    fs.writeFileSync('.env.test2', 'APP1_KEY3=value3\nAPP1_KEY4=value4');
  });

  afterEach(() => {
    // Clean up temporary files and revert to original working directory
    fs.rmSync(process.cwd(), { recursive: true, force: true });
    process.chdir(originalCwd);
    jest.resetModules();
  });

  test('loads environment variables from .env.<environment> files', () => {
    _loadAllEnvs();
    const envs = _getEnvs();

    expect(envs).toEqual({
      test1: {
        APP1_KEY1: 'value1',
        APP1_KEY2: 'value2',
      },
      test2: {
        APP1_KEY3: 'value3',
        APP1_KEY4: 'value4',
      },
    });
  });

  test('ignores non-env files', () => {
    fs.writeFileSync('non-env-file', 'APP1_KEY5=value5\nAPP1_KEY6=value6');

    _loadAllEnvs();
    const envs = _getEnvs();

    expect(Object.keys(envs)).not.toContain('non-env-file');
  });
});


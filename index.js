// index.js
const fs = require('fs');
const dotenv = require('dotenv');


const PM2DotEnv = () => {
  let allEnvs = null;

  const _ignored_suffix = [
    'local',
    'example'
  ];

  const _setEnvs = (envs) => {
    allEnvs = envs;
  };

  const _getEnvs = () => {
    return allEnvs;
  };

  const _filterEnvs = (file) => {
      return file.startsWith('.env') && _ignored_suffix.every(suffix => !file.endsWith(suffix))
  }

  const _loadAllEnvs = () => {
    const envs = {};

    const envFiles = fs.readdirSync(process.cwd()).filter(_filterEnvs)

    for (const envFile of envFiles) {
      const environment = (envFile === '.env' ? 'default' : envFile.replace('.env.', ''))

      envs[environment] = dotenv.config({ path: envFile }).parsed
    }

    _setEnvs(envs)
  };

  const injectEnvs = (appName) => {
    const injectedEnvs = {}

    if (allEnvs === null) {
      _loadAllEnvs()
    }

    for (const environment of Object.keys(allEnvs)) {
      const prefixedEnvs = {};
      for (const [key, value] of Object.entries(allEnvs[environment])) {
        if (key.startsWith(`${appName.toUpperCase()}_`)) {
          const newKey = key.replace(`${appName.toUpperCase()}_`, '')
          prefixedEnvs[newKey] = value;
        }
      }
      injectedEnvs[environment === 'default' ? 'env' : `env_${environment}`] = prefixedEnvs
    }

    return injectedEnvs
  }

  return {
    injectEnvs,
    _loadAllEnvs,
    _getEnvs,
    _setEnvs,
  }
}

const __PM2DotEnv__ = PM2DotEnv();

module.exports = __PM2DotEnv__

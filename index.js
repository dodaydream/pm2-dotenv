// index.js
const fs = require('fs');
const dotenv = require('dotenv');

let allEnvs = null;

const loadAllEnvs = () => {
  const envs = {};
  const envFiles = fs.readdirSync(process.cwd()).filter(file => file.startsWith('.env') && !file.endsWith('.local') && file !== '.env');

  for (const envFile of envFiles) {
    const environment = envFile.replace('.env.', '');
    envs[environment] = dotenv.config({ path: envFile }).parsed;
  }

  return envs;
};

const injectVars = (appName) => {
  const injectedVars = {};

  if (!allEnvs) {
    allEnvs = loadAllEnvs();
  }

  for (const environment of Object.keys(allEnvs)) {
    const prefixedVars = {};
    for (const [key, value] of Object.entries(allEnvs[environment])) {
      if (key.startsWith(`${appName.toUpperCase()}_`)) {
        const newKey = key.replace(`${appName.toUpperCase()}_`, '');
        prefixedVars[newKey] = value;
      }
    }
    injectedVars[`env_${environment}`] = prefixedVars;
  }
  return injectedVars;
};

module.exports = {
  injectVars
};


const { injectEnvs } = require('../index.js')

module.exports = {
  apps: [
    {
      name: 'app',
      script: 'app.js',
      ...injectEnvs('app'),
    },
    {
      name: 'worker',
      script: 'worker.js',
      ...injectEnvs('worker'),
    }
  ],
};

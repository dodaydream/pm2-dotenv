// __tests__/pm2-dotenv.test.js
const fs = require('fs');
const { loadAllEnvs, injectVars } = require('../index');

// ...existing tests...

describe('injectVars', () => {
  const allEnvs = {
    test1: {
      APP1_HOST: 'localhost',
      APP1_PORT: '3000',
      APP2_API_KEY: '123456',
    },
    test2: {
      APP1_HOST: 'localhost',
      APP1_PORT: '3001',
      APP2_API_KEY: '654321',
    },
  };

  test('injectVars injects environment variables with the correct prefix', () => {
    const injectedVarsForApp1 = injectVars('app1', allEnvs);

    expect(injectedVarsForApp1).toEqual({
      env_test1: {
        HOST: 'localhost',
        PORT: '3000',
      },
      env_test2: {
        HOST: 'localhost',
        PORT: '3001',
      },
    });
  });

  test('injectVars ignores environment variables with different prefixes', () => {
    const injectedVarsForApp2 = injectVars('app2', allEnvs);

    expect(injectedVarsForApp2).toEqual({
      env_test1: {
        API_KEY: '123456',
      },
      env_test2: {
        API_KEY: '654321',
      },
    });
  });

  test('injectVars returns an empty object for non-existent app prefixes', () => {
    const injectedVarsForApp3 = injectVars('app3', allEnvs);

    expect(injectedVarsForApp3).toEqual({
      env_test1: {},
      env_test2: {},
    });
  });
});


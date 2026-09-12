const { execSync } = require('child_process');

try {
  execSync('npx mocha tests --exit', { stdio: 'inherit' });
} catch (erreur) {
  console.log('Certains tests ont echoue, voir ci-dessus.');
}

require('./app');

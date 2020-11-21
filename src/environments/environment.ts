// TODO
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const packageJson = require('../../package.json');

export const environment = {
  appName: 'VG',
  envName: 'DEV',
  production: false,
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  }
};

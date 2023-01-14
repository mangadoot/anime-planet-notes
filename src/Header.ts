import WebpackUserscript from 'webpack-userscript';

function generateHeaders(isDevelopment: boolean, buildVersion?: string): WebpackUserscript.HeaderObject {
  /* eslint-disable sort-keys */
  const header: WebpackUserscript.HeaderObject = {
    name: 'anime-planet-notes',
    description: 'allows to add notes to anime-planet entries',
    version: buildVersion !== undefined ? buildVersion : '[version]',
    author: 'mangadoot',
    namespace: 'https://github.com/mangadoot',
    license: 'MIT',
    match: ['*://www.google.com/*'],
    connect: ['www.google.com'],
    noframes: true,
    'run-at': 'document-end',
    grant: ['GM.registerMenuCommand'],
  };
  /* eslint-enable sort-keys */

  if (isDevelopment) {
    header.name += ' (DEV)';
    header.version += '.[buildTime]';
    delete header.downloadURL;
    delete header.updateURL;
  }

  return header;
}

export default generateHeaders;

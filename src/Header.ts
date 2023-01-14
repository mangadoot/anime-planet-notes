import WebpackUserscript from 'webpack-userscript';

function generateHeaders(isDevelopment: boolean, buildVersion?: string): WebpackUserscript.HeaderObject {
  /* eslint-disable sort-keys */
  const header: WebpackUserscript.HeaderObject = {
    name: 'anime-planet-notes',
    description: 'allows to add notes to anime-planet entries',
    version: buildVersion === undefined ? '[version]' : buildVersion,
    author: 'mangadoot',
    namespace: 'https://github.com/mangadoot',
    license: 'MIT',
    match: ['*://www.anime-planet.com/manga/*'],
    connect: ['anime-planet.com'],
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

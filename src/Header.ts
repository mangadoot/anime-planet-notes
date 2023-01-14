import WebpackUserscript from 'webpack-userscript';

const icon =
  'data:image/png;base64,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';

function generateHeaders(isDevelopment: boolean, buildVersion?: string): WebpackUserscript.HeaderObject {
  /* eslint-disable sort-keys */
  const header: WebpackUserscript.HeaderObject = {
    name: 'anime-planet-notes',
    description: 'allows to add notes to anime-planet entries',
    version: buildVersion === undefined ? '[version]' : buildVersion,
    author: 'mangadoot',
    icon,
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

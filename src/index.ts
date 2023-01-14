import './styles.scss';

// import 'primeicons/primeicons.css';
// import generateHeaders from '@/Header';
import Site from '@/Site';

// import Settings from '@/Utils/Settings/Settings';
// import Storage from '@/Utils/Storage';
import logger from './Utils/Logger';

new Site(logger.getLogger('Site')).init();

// new Settings(
//   new Storage(window.localStorage, `${generateHeaders(false).name || 'userscript'}-settings`),
//   logger.getLogger('settings'),
// )
//   .onNewSettings((settings) => logger.info('is enabled:', settings.enabled))
//   .registerDialog();

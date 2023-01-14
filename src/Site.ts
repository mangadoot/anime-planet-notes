import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/nova/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import pWaitFor from 'p-wait-for';
import { createPinia, PiniaVuePlugin } from 'pinia';
import * as PrimeVue from 'primevue/config';
import { Logger } from 'ts-log';
import { isSomething, isString } from 'ts-type-guards';
import Vue from 'vue';

import NotesApp from '@/NotesApp.vue';
import { provideSiteInfo } from '@/SiteInfo';
import { type SiteInfo } from '@/types/SiteInfo';

export default class Site {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public async init(): Promise<void> {
    this.logger.debug('extracting site info ...');
    this.extractSiteInfo()
      .then((siteInfo) => {
        this.logger.debug('got siteinfo', siteInfo);
        provideSiteInfo(siteInfo);
        return siteInfo;
      })
      .then(this.createVue.bind(this))
      .catch((error) => this.logger.error(error));
  }

  private createVue(siteInfo: SiteInfo): void {
    this.logger.info('intializing / creating vue container elements ...');
    const vueTarget = this.createVueTarget();

    this.logger.info('creating pinia ...');
    const pinia = createPinia();
    pinia.use(() => ({ siteInfo }));

    this.logger.info('creating vue app ...');
    Vue.use(PiniaVuePlugin);
    Vue.use(PrimeVue);
    new Vue({
      el: vueTarget,
      pinia,
      render: (h) => h(NotesApp),
    });
  }

  private createVueTarget(): HTMLDivElement {
    const sibling = document.querySelector('#entry > div:nth-child(2)');
    if (sibling === null) {
      throw new Error('could not find element to attach everything to');
    }
    const newSection = document.createElement('div');
    newSection.classList.add('pure-1');
    sibling.after(newSection);
    const vueTarget = document.createElement('div');
    newSection.append(vueTarget);
    return vueTarget;
  }

  private async extractSiteInfo(): Promise<SiteInfo> {
    await pWaitFor(() => isSomething(unsafeWindow.AP_VARS), { timeout: 2000 });

    if (!isSomething(unsafeWindow.AP_VARS)) {
      throw new Error('cannot extract site info: AP_VARS not set!');
    }
    if (!isSomething(unsafeWindow.AP_VARS.ENTRY_INFO)) {
      throw new Error('cannot extract site info: ENTRY_INFO not set' + JSON.stringify(unsafeWindow.AP_VARS));
    }
    if (
      !isString(unsafeWindow.AP_VARS.ENTRY_INFO.id)
      || !isString(unsafeWindow.AP_VARS.ENTRY_INFO.type)
      || !isString(unsafeWindow.AP_VARS.ENTRY_INFO.url)
    ) {
      throw new Error('cannot extract site info: invalid ENTRY_INFO' + JSON.stringify(unsafeWindow.AP_VARS.ENTRY_INFO));
    }
    if (unsafeWindow.AP_VARS.ENTRY_INFO.type !== 'anime' && unsafeWindow.AP_VARS.ENTRY_INFO.type !== 'manga') {
      throw new Error('cannot extract site info: invalid type' + JSON.stringify(unsafeWindow.AP_VARS.ENTRY_INFO));
    }

    return {
      id: Number(unsafeWindow.AP_VARS.ENTRY_INFO.id),
      slug: unsafeWindow.AP_VARS.ENTRY_INFO.url,
      type: unsafeWindow.AP_VARS.ENTRY_INFO.type,
    };
  }
}

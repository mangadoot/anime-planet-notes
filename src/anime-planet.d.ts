export {};
declare global {
  interface Window {
    AP_VARS?: {
      ENTRY_INFO?: {
        id?: string;
        type?: string;
        url?: string;
      };
    };
  }
}

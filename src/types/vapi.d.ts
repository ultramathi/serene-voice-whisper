
declare global {
  interface Window {
    vapi?: any;
  }
}

export interface VapiInstance {
  start: (assistantOptions: any) => void;
  stop: () => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  setMuted: (muted: boolean) => void;
  send: (message: any) => void;
  say: (text: string) => void;
}

export {};

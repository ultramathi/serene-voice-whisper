
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
}

export {};

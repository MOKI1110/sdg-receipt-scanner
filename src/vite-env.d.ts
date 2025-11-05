/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENROUTER_API_KEY: string;
    // Add more env variables here if needed in future
    // readonly VITE_OTHER_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
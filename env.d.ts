declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        APP_NAME: string;
        CLIENT_ID: string;
        MONGO_URI: string;
    }
}

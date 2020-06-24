declare module 'rastrojs' {

    export interface Tracking {
        code: string;
        type?: string;
        tracks?: {
            locale: string;
            status: string;
            observation: string;
            trackedAt: Date;
        }[];
        isDelivered?: boolean;
        postedAt?: Date;
        updatedAt?: Date;
        isInvalid?: boolean;
        error?: 'invalid_code' | 'not_found';
    }
    
    export class RastroJS {
        track: (codes: string | string[]) => Promise<Tracking[]>;
        private requestObject;
        private parseResponse;
        private readonly uri;
        static isValidOrderCode: (code: string) => boolean;
    }
    
    export const rastro: RastroJS;

}

export interface IResponseImage {
    id: string;
    slug: string;
    width: number;
    height: number;
    color: string;
    description: null;
    altDescription: string;
    urls: IUrls;
}

export interface IUrls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    smallS3: string;
}

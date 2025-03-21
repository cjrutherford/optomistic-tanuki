import { Quill } from 'quill';

declare module 'quill-image-resize-module' {
    export interface ImageResizeOptions {
        modules?: {
            [key: string]: any;
        };
        handleStyles?: {
            [key: string]: string;
        };
        displayStyles?: {
            [key: string]: string;
        };
        toolbarStyles?: {
            [key: string]: string;
        };
        overlayStyles?: {
            [key: string]: string;
        };
        [key: string]: any;
    }

    export default class ImageResize {
        constructor(quill: Quill, options?: ImageResizeOptions);
    }
}
import * as svgCaptcha from 'svg-captcha';
export declare class ToolsService {
    captche(size?: number): Promise<svgCaptcha.CaptchaObj>;
    validateCaptcha(code: any, captcha: any): boolean;
    validateCaptchaCount(session: any): void;
}

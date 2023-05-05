import { BadRequestException, Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class ToolsService {
  async captche(size = 4) {
    const captcha = await svgCaptcha.create({
      //可配置返回的图片信息
      size, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    return captcha;
  }
  validateCaptcha(code, captcha): boolean {
    const CODETIMELINES = 5 * 60 * 1000;
    const now = Date.now();
    if (captcha && now - captcha.codeTime > CODETIMELINES) {
      throw new BadRequestException([
        'Captcha code timeout, Please replace the captcha',
      ]);
    }
    if (
      code &&
      captcha &&
      captcha.code &&
      code.toLocaleLowerCase() === captcha.code.toLocaleLowerCase()
    ) {
      delete captcha.code;
      return true;
    }
    return false;
  }

  validateCaptchaCount(session) {
    if (!session.captcha) return;
    const MAX_TRIES = 3;
    const CAPTCHATIMELINES = 1 * 60 * 60 * 1000;
    if (session.captcha.errorCount < MAX_TRIES) return;
    if (!session.captcha.failTime) {
      session.captcha.failTime = Date.now();
    }
    if (session.captcha.errorCount >= MAX_TRIES) {
      const now = Date.now();
      if (now - session.captcha.failTime < CAPTCHATIMELINES) {
        throw new BadRequestException([
          'Too many attempts, please try again later',
        ]);
      }
      session.captcha = {
        code: '',
        codeTime: 0,
        errorCount: 0,
        failTime: 0,
      };
    }
  }
}

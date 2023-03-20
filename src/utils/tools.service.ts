import { Injectable } from '@nestjs/common';
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
  validateCaptcha(code, session): boolean {
    if (
      code &&
      session &&
      code.toLocaleLowerCase() === session.toLocaleLowerCase()
    ) {
      delete session.captcha;
      return true;
    }
    return false;
  }
}

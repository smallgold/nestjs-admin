import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtValidateService {
  private tokenList: Array<string> = [];

  addTokenToBlacklist(token: string) {
    if (!this.tokenList.length) {
      this.tokenList.push(token);
    }
  }

  isTokenBlacklisted(token: string): boolean {
    let bool = false;
    let index = -1;
    this.tokenList.map((v, i) => {
      if (v === token) {
        index = i;
        bool = true;
      }
    });
    this.tokenList.splice(index, 1);
    return bool;
  }
}

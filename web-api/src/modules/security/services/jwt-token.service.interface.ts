/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webFrame/LICENSE
 */

export interface TokenGenerateOptions {
  userId: number;
  clientId: string;
  clientSecret: string;
  expirySeconds: number;
  grants: string[];
}

export interface TokenPayload {
  userId: number;
  clientId: string;
  grants: string[];
  issuer: string;
  expiresAt: Date;
}

export interface IJwtTokenService {
  generate(options: TokenGenerateOptions): Promise<string>;
  verify(token: string, clientSecret: string): Promise<TokenPayload>;
}
export const IJwtTokenService = Symbol.for('IJwtTokenService');

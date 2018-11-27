/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

export interface OAuthClient {
  id: string;
  secret: string;
  grants: string[];
  accessTokenExpirySeconds: number;
  refreshTokenExpirySeconds: number;
}

export interface OAuthConfiguration {
  issuer: string;
  algorithm: string;
  accessTokenSecret: string;
  refreshTokenSecret: string;
  clients: OAuthClient[];
}

export interface IConfigurationService {
  getOAuthConfig(): OAuthConfiguration;
}
export const IConfigurationService = Symbol.for('IConfigurationService');

/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */
import { EmailProvider } from '../email/email-provider.enum';

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

export interface EmailTemplate {
  html: string;
  text: string;
  subject: string;
}
export interface EmailTemplates {
  activation: EmailTemplate;
}

export interface EmailConfigurationParams {
  from: string;
}

export interface IConfigurationService {
  getOAuthConfig(): OAuthConfiguration;
  getEmailProvider(): EmailProvider;
  getEmailTemplates(): EmailTemplates;
  getEmailConfigurationParams(): EmailConfigurationParams;
}
export const IConfigurationService = Symbol.for('IConfigurationService');

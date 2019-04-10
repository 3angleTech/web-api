/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Email, EmailTemplateVariables } from '.';
import { IStringTemplateService, StringTemplateService } from '../string-template';
import { isNil, tryGetValue } from '../utils';

export class EmailBuilder {
  private _to: string;
  private _from: string;
  private _html: string;
  private _text: string;
  private _subject: string;

  private templateService: IStringTemplateService;

  constructor() {
    this.templateService = new StringTemplateService();
  }

  public set to(to: string) {
    this._to = to;
  }

  public set from(from: string) {
    this._from = from;
  }

  public set html(html: string) {
    this._html = html;
  }

  public set text(text: string) {
    this._text = text;
  }

  public set subject(subject: string) {
    this._subject = subject;
  }

  public build(templateVariables: EmailTemplateVariables): Email {
    const subjectVariables = tryGetValue(templateVariables, 'subject');
    const htmlVariables = tryGetValue(templateVariables, 'html');
    const textVariables = tryGetValue(templateVariables, 'text');

    let subject = this._subject;
    let html = this._html;
    let text = this._text;

    if (!isNil(subjectVariables)) {
      subject = this.templateService.interpolate(subject, subjectVariables);
    }

    if (!isNil(htmlVariables)) {
      html = this.templateService.interpolate(html, htmlVariables);
    }

    if (!isNil(textVariables)) {
      text = this.templateService.interpolate(text, textVariables);
    }

    return {
      to: this._to,
      from: this._from,
      subject: subject,
      html: html,
      text: text,
    };
  }
}

/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

export interface IJsonConverterService {
  deserialize<T>(json: any, classReference: { new(): T }): T;
}
export const IJsonConverterService = Symbol.for('IJsonConverterService');

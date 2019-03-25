/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

export interface ISendGridService {
    something(param: any): any;
}
export const ISendGridService = Symbol.for('ISendGridService');

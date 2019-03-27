
/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */
import { JsonObject, JsonProperty } from 'json2typescript';
import { EmailParams } from './email-params.do';

export class ActivateAccountParams extends EmailParams {

    @JsonProperty('token', String, true)
    public token: string = undefined;

}

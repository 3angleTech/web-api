
/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */
import { JsonObject, JsonProperty } from 'json2typescript';
import { EmailParams } from './email-params.do';

export class NewAccountParams extends EmailParams {

    @JsonProperty('username', String, true)
    public username: string = undefined;

}


/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */
import { JsonObject, JsonProperty } from 'json2typescript';

export class EmailParams {

    @JsonProperty('to', String, true)
    public to: string = undefined;

    @JsonProperty('from', String, true)
    public from: string = undefined;

    @JsonProperty('subject', String, true)
    public subject?: string = undefined;

    @JsonProperty('text', String, true)
    public rawText?: string = undefined;

    @JsonProperty('html', String, true)
    public htmlText?: string = undefined;

}

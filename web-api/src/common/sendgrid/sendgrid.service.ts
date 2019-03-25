/**
 * @license
 * Copyright (c) 2018 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license webApi/LICENSE
 */

import { Client } from '@sendgrid/client';
import { injectable } from 'inversify';
import { ISendGridService } from './sendgrid.service.interface';

@injectable()
export class SendGridService implements ISendGridService {

    private static instance: SendGridService;
    private static sgClient: any;

    constructor() {
        if (SendGridService.instance) {
            return SendGridService.instance;
        }
        SendGridService.sgClient = require('@sendgrid/client');
        SendGridService.setApiKey();
        this.helloWorld();
        SendGridService.instance = this;
    }

    private static setApiKey(): void {
        SendGridService.sgClient.setApiKey(process.env.SENDGRID_API_KEY);
    }

    private helloWorld(): void {
        const request = {
            method: 'GET',
            url: '/v3/api_keys',
        };
        SendGridService.sgClient.request(request)
            .then(([response, body]) => {
                console.log(response.statusCode);
                console.log(body);
            });
    }

    public something(param: any): any {

    }

}

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable()
export class UserService {

    constructor(private http: Http) { }
    
    getUser(): User {
        var obj = {
            _id: '123',
            empId: 556661,
            email: 'anand@gmal.com',
            securityQuestion: '1234'
        }
        return obj;
    }
}
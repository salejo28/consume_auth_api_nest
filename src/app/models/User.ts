export class User {
    constructor(username = '', email = '', password = '', cpassword = '') {
        this.username = username;
        this.email = email;
        this.password = password;
        this.cpassword = cpassword;
    }

    username?: string;
    email?: string;
    password?: string;
    cpassword?: string;

}

export class UserLogin {
    constructor(username = '', password = '') { 
        this.username = username;
        this.password = password;
    }

    username?: string;
    password?: string;
}
export class User {
    uid: string;
    firstname: string;
    middlename: string;
    lastname: string;
    credentials: UserCredentials

    constructor(uid?: string, firstname?: string, middlename?: string, lastname?: string, username?: string, password?: string, ...roles: string[]) {
        this.uid = uid ?? '',
        this.firstname = firstname ?? '';
        this.lastname = lastname ?? '';
        this.middlename = middlename ?? '';
        this.lastname = lastname ?? '';
        this.credentials = {
            username: username ?? '',
            password: password ?? '',
            roles: roles.length < 1 ? ["user"] : roles
        };
    }

    static toUser(userProfile: UserProfileInfo): User {
        return new User(
            userProfile.uid,
            userProfile.firstname,
            userProfile.middlename,
            userProfile.lastname,
            userProfile.email,
            ...userProfile.roles
        );
    }

    toProfile(uid?:string): UserProfileInfo {
        return {
            uid: this.uid === '' && uid ? uid : this.uid,
            firstname: this.firstname,
            middlename: this.middlename,
            lastname: this.lastname,
            email: this.credentials.username,
            roles: this.credentials.roles
        };
    }
}

export interface UserCredentials {
    username: string;
    password: string;
    roles: string[];
}

export interface UserProfileInfo {
    uid: string;
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    roles: string[];
}
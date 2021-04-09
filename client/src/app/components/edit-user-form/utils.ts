import { User } from 'src/app/interfaces/user';

export const UserInitial = (): User => {
    return { 
        id: 0,
        email: '',
        created: new Date(),
        admin: 0
    };
}

export const NewDataInitial = (): any => {
    return {
        email: '',
        password: '',
        confirmPassword: ''
    };
}

export const ConfigInitial = () => {
    return { 
        editPassword: false 
    };
}
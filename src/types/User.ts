export enum Role {
    User = "user",
    Admin = "admin",
    SuperAdmin = "superadmin",
}

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    roles?: Role;
}

export default User;
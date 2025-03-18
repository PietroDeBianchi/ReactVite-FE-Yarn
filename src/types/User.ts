interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    roles?: string;
}

export default User;
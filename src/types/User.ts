interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    roles?: string;
}

export default User;
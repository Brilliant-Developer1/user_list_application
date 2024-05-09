export default async function getAllUsers () {
    try {
        const result = await fetch('https://dummyjson.com/users');
        if (!result.ok) {
            throw new Error('Failed to fetch users');
        }
        const responseData = await result.json();
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        const mergeUsers = existingUsers.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            companyName: user.companyName,
            image: user.image,
            address: {
                address: user.address?.address || '',
                city: user.address?.city || '',
            },
            company: {
                name: user.companyName || '',
                department: '',
                title: '',
            },
        }));
        const users = Array.isArray(responseData.users) ? [...responseData.users, ...mergeUsers] : mergeUsers;
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}
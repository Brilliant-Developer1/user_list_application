export default async function getAllUsers () {
    const result = await fetch('https://dummyjson.com/users');
    return result.json();
}
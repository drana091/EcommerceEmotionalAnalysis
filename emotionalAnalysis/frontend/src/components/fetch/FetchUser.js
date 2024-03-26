export async function FetchUser(userID) {
    try {
        const response = await fetch(`/api/user/${userID}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product data:', error);
        return null;
    }
}
export async function FetchUserCart(user) {
    try {
        const response = await fetch(`/api/user-cart/${user}`);
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
}
export async function FetchProduct(productID) {
    try {
        const response = await fetch(`/api/product/${productID}`);
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
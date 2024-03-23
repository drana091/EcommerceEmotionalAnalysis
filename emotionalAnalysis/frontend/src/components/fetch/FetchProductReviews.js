export async function FetchProductReviews(productID) {
    try {
        const response = await fetch(`/api/product-reviews/${productID}`);
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
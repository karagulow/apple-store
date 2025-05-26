import axios from 'axios';

const API_BASE_URL = 'https://d742581c7aead4d3.mokky.dev';

export const getProduct = async (id: number) => {
	const response = await axios.get(`${API_BASE_URL}/products/${id}`);
	return response.data;
};

export const getRecommendedProducts = async (
	category: string,
	excludeId: number
) => {
	const response = await axios.get(
		`${API_BASE_URL}/products?category=${category}`
	);
	const filtered = response.data.filter((item: any) => item.id !== excludeId);
	return filtered;
};

import axios from 'axios';

const API_BASE_URL = 'https://d742581c7aead4d3.mokky.dev';

export const getProducts = async (params?: Record<string, string>) => {
	const response = await axios.get(`${API_BASE_URL}/products`, {
		params,
	});
	return response.data;
};

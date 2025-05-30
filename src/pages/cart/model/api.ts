import axios from 'axios';

const API_BASE_URL = 'https://d742581c7aead4d3.mokky.dev';

export const getProductsByIds = async (ids: string[]) => {
	const requests = ids.map(id =>
		axios
			.get(`${API_BASE_URL}/products/${id}`, {
				params: { _select: 'id,name,preview,price' },
			})
			.then(res => res.data)
	);

	return Promise.all(requests);
};

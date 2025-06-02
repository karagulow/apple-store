export interface Product {
	id: string;
	name: string;
	price: number;
	preview: string;
	category: string;
}

export interface FiltersState {
	categories: string[];
	priceRange: {
		min: number;
		max: number;
	};
}

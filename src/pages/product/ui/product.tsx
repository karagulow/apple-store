import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './product.module.scss';

import { Button, LikeButton } from '../../../shared/ui';
import { ProductSlider } from '../../../entities/product';

import { getProduct, getRecommendedProducts } from '../model/api';

interface ProductType {
	id: number;
	name: string;
	category: string;
	preview: string;
	price: number;
	specifications: {
		[section: string]: {
			[key: string]: string;
		};
	};
}

export const Product: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<ProductType | null>(null);
	const [loading, setLoading] = useState(true);
	const [recommendations, setRecommendations] = useState<ProductType[]>([]);
	const [recLoading, setRecLoading] = useState(true);

	useEffect(() => {
		if (!id) return;

		const numericId = parseInt(id, 10);
		if (isNaN(numericId)) return;

		const fetchProduct = async () => {
			try {
				const json = await getProduct(numericId);
				setProduct(json);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	useEffect(() => {
		if (!product) return;

		const fetchRecommendations = async () => {
			try {
				setRecLoading(true);
				const recs = await getRecommendedProducts(product.category, product.id);
				setRecommendations(recs.slice(0, 10));
			} catch (error) {
				console.error('Ошибка загрузки рекомендаций:', error);
			} finally {
				setRecLoading(false);
			}
		};

		fetchRecommendations();
	}, [product]);

	if (loading || !product) {
		return <div>Загрузка...</div>;
	}

	return (
		<div className={styles.product}>
			<div className={styles.product__about}>
				<div className={styles.product__preview}>
					<img src={product.preview} alt={product.name} />
				</div>

				<div className={styles.product__info}>
					<p className={styles.product__name}>{product.name}</p>
					<hr className='divider' />
					<span className={styles.product__price}>
						{product.price.toLocaleString('ru-RU')} ₽
					</span>
					<div className={styles.product__controls}>
						<Button className={styles['product__cart-btn']}>
							Добавить в корзину
						</Button>
						<LikeButton
							className={styles['product__like-btn']}
							isFavorite={false}
							onToggle={function (): void {
								throw new Error('Function not implemented.');
							}}
						/>
					</div>
				</div>
			</div>

			<ProductSlider
				products={recommendations.map(p => ({
					id: p.id.toString(),
					name: p.name,
					category: p.category,
					preview: p.preview,
					price: p.price,
				}))}
				title='Рекомендации'
				isLoading={recLoading}
			/>

			<div className={styles.product__specifications}>
				{Object.entries(product.specifications).map(
					([sectionTitle, specItems]) => (
						<div
							key={sectionTitle}
							className={styles.product__specifications__block}
						>
							<h3 className={styles.product__specifications__title}>
								{sectionTitle}
							</h3>
							<ul className={styles.product__specifications__list}>
								{Object.entries(specItems).map(([key, value]) => (
									<li
										key={key}
										className={styles.product__specifications__item}
									>
										<span className={styles.product__specifications__key}>
											{key}
										</span>
										<span className={styles.product__specifications__value}>
											{value}
										</span>
									</li>
								))}
							</ul>
						</div>
					)
				)}
			</div>
		</div>
	);
};

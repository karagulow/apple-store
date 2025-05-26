import { useEffect, useState } from 'react';
import { useProductSlider } from '../model/use-product-slider';

import styles from './product-slider.module.scss';

import { ArrowButton } from '../../../shared/ui';
import { ProductCard } from './product-card';
import { ProductCardSkeleton } from './product-card-skeleton';

interface Product {
	id: string;
	name: string;
	category: string;
	preview: string;
	price: number;
}

interface ProductSliderProps {
	products: Product[];
	title: string;
	isLoading?: boolean;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({
	products,
	title,
	isLoading,
}) => {
	const [slidesToShow, setSlidesToShow] = useState(1);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 480) {
				setSlidesToShow(1);
			} else if (window.innerWidth < 768) {
				setSlidesToShow(2);
			} else if (window.innerWidth < 1280) {
				setSlidesToShow(3);
			} else {
				setSlidesToShow(4);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const { currentSlide, slideWidth, slideStep, nextSlide, prevSlide } =
		useProductSlider({
			productsCount: products.length,
			slidesToShow,
			gap: 20,
		});

	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);

	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchStart(e.targetTouches[0].clientX);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const handleTouchEnd = () => {
		if (touchStart - touchEnd > 50) {
			nextSlide();
		}

		if (touchStart - touchEnd < -50) {
			prevSlide();
		}
	};

	return (
		<div className={styles.slider}>
			<div className={styles.slider__top}>
				<h2 className={styles.slider__title}>{title}</h2>

				<div className={styles.slider__controls}>
					<ArrowButton direction='left' onClick={prevSlide} />
					<ArrowButton direction='right' onClick={nextSlide} />
				</div>
			</div>

			<div
				className={styles.slider__content}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<div
					className={styles.slider__items}
					style={{
						transform: `translateX(calc(-${currentSlide} * ${slideStep}))`,
						gap: '20px',
					}}
				>
					{isLoading
						? Array.from({ length: slidesToShow }, (_, i) => (
								<div
									key={`skeleton-${i}`}
									className={styles.slider__item}
									style={{ width: slideWidth }}
								>
									<ProductCardSkeleton />
								</div>
						  ))
						: products.map((product, index) => (
								<div
									key={index}
									className={styles.slider__item}
									style={{ width: slideWidth }}
								>
									<ProductCard
										id={product.id}
										name={product.name}
										price={product.price}
										image={product.preview}
									/>
								</div>
						  ))}
				</div>
			</div>
		</div>
	);
};

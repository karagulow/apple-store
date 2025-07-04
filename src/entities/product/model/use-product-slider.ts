import { useState, useEffect, useMemo, useCallback } from 'react';

interface UseProductSliderProps {
	productsCount: number;
	slidesToShow: number;
	gap: number;
}

export const useProductSlider = ({
	productsCount,
	slidesToShow,
	gap,
}: UseProductSliderProps) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const slideWidth = useMemo(
		() => `calc((100% - ${(slidesToShow - 1) * gap}px) / ${slidesToShow})`,
		[slidesToShow, gap]
	);

	const slideStep = useMemo(
		() => `calc(${slideWidth} + ${gap}px)`,
		[slideWidth, gap]
	);

	useEffect(() => {
		setCurrentSlide(0);
	}, [slidesToShow]);

	const nextSlide = useCallback(() => {
		setCurrentSlide(prev =>
			prev + 1 >= productsCount - slidesToShow + 1 ? 0 : prev + 1
		);
	}, [productsCount, slidesToShow]);

	const prevSlide = useCallback(() => {
		setCurrentSlide(prev =>
			prev === 0 ? productsCount - slidesToShow : prev - 1
		);
	}, [productsCount, slidesToShow]);

	return {
		currentSlide,
		slideWidth,
		slideStep,
		nextSlide,
		prevSlide,
	};
};

import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../shared/lib/hooks/redux';

import styles from './header.module.scss';
import heartIcon from '../../../shared/assets/images/heart.svg';
import bagIcon from '../../../shared/assets/images/bag.svg';

import { Container, Logo } from '../../../shared/ui';

const LogoLink = memo(() => (
	<Link className={styles.header__logo} to='/'>
		<Logo />
	</Link>
));

const FavoriteLink = memo(() => (
	<Link className={styles.header__link} to='/favorites'>
		<img src={heartIcon} alt='heart' aria-label='Перейти в избранное' />
	</Link>
));

const CartLink = memo(({ totalItems }: { totalItems: number }) => (
	<Link className={styles.header__link} to='/cart'>
		<img src={bagIcon} alt='bag' aria-label='Перейти в корзину' />
		{totalItems > 0 && <div className={styles.header__count}>{totalItems}</div>}
	</Link>
));

export const Header: React.FC = () => {
	const cart = useAppSelector(state => state.cart);
	const totalItems = useMemo(
		() => cart.reduce((sum, item) => sum + item.quantity, 0),
		[cart]
	);

	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.header__wrapper}>
					<LogoLink />

					<div className={styles.header__links}>
						<FavoriteLink />
						<CartLink totalItems={totalItems} />
					</div>
				</div>
			</Container>
		</header>
	);
};

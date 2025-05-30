import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../shared/lib/hooks/redux';

import styles from './header.module.scss';
import heartIcon from '../../../shared/assets/images/heart.svg';
import bagIcon from '../../../shared/assets/images/bag.svg';

import { Container, Logo } from '../../../shared/ui';

export const Header: React.FC = () => {
	const cart = useAppSelector(state => state.cart);
	const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.header__wrapper}>
					<Link to='/'>
						<Logo />
					</Link>

					<div className={styles.header__links}>
						<Link className={styles.header__link} to='/favorites'>
							<img src={heartIcon} alt='heart' />
						</Link>
						<Link className={styles.header__link} to='/cart'>
							<img src={bagIcon} alt='bag' />
							{totalItems > 0 && (
								<div className={styles.header__count}>{totalItems}</div>
							)}
						</Link>
					</div>
				</div>
			</Container>
		</header>
	);
};

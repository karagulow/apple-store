import { Link } from 'react-router-dom';

import styles from './header.module.scss';
import heartIcon from '../../../shared/assets/images/heart.svg';
import bagIcon from '../../../shared/assets/images/bag.svg';

import { Container, Logo } from '../../../shared/ui';

export const Header: React.FC = () => {
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
						</Link>
					</div>
				</div>
			</Container>
		</header>
	);
};

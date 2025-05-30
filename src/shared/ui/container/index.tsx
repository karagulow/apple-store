import styles from './container.module.scss';

interface Props {
	children: React.ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => {
	return <div className={styles.container}>{children}</div>;
};

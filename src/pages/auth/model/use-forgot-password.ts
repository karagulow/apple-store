import { useState } from 'react';
import { resetPasswordForEmail } from '../../../shared/api/authApi';

export const useForgotPassword = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const sendResetEmail = async (email: string) => {
		setLoading(true);
		try {
			await resetPasswordForEmail(email);
			return true;
		} catch (err) {
			setError((err as Error).message);
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { sendResetEmail, loading, error };
};

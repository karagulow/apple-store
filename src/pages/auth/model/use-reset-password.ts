import { useState } from 'react';
import { updatePassword } from '../../../shared/api/authApi';

export const useResetPassword = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const resetPassword = async (newPassword: string) => {
		setLoading(true);
		try {
			await updatePassword(newPassword);
			return true;
		} catch (err) {
			setError((err as Error).message);
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { resetPassword, loading, error };
};

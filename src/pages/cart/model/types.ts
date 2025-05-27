import type { UseFormRegister, FieldErrors } from 'react-hook-form';

export interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: string;
	comment?: string;
}

export interface CartFormProps {
	register: UseFormRegister<FormData>;
	errors: FieldErrors<FormData>;
}

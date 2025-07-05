import {
	AddressSuggestions,
	type DaDataSuggestion,
	type DaDataAddress,
} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { Controller, useFormContext } from 'react-hook-form';
import styles from './address-input.module.scss';

interface AddressInputProps {
	label: string;
	name: string;
	error?: string;
}

const DADATA_TOKEN = import.meta.env.VITE_DADATA_API_KEY;

export const AddressInput: React.FC<AddressInputProps> = ({
	label,
	name,
	error,
}) => {
	const { control } = useFormContext();

	return (
		<label className={styles.input}>
			<span className={styles.input__label}>{label}</span>
			<Controller
				name={name}
				control={control}
				rules={{ required: 'Введите адрес' }}
				render={({ field: { onChange, value } }) => (
					<AddressSuggestions
						token={DADATA_TOKEN}
						value={value}
						onChange={(suggestion?: DaDataSuggestion<DaDataAddress>) => {
							onChange(suggestion?.value || '');
						}}
						inputProps={{
							className: styles.input__field,
						}}
						suggestionsClassName={styles.input__suggestions}
						suggestionClassName={styles.input__suggestion}
						highlightClassName={styles.input__highlight}
					/>
				)}
			/>
			{error && <span className={styles.input__error}>{error}</span>}
		</label>
	);
};

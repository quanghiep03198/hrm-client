import { useEffect, useState } from 'react';
import { Input } from '../..';

type DebouncedInputProps = {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const DebouncedInput: React.FC<DebouncedInputProps> = ({
	value: initialValue,
	onChange,
	debounce,
	...props
}) => {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value]);

	return <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
};

DebouncedInput.defaultProps = {
	debounce: 500
};

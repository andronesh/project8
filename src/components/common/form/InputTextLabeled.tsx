type Props = {
	label: string;
	name: string;
	value: string | undefined;
	placeholder: string;
	disabled?: boolean;
	required?: boolean;
	onChange: (event: any) => void;
	className?: string;
};

export default function InputTextLabeled(props: Props) {
	return (
		<div className={props.className}>
			<label htmlFor={props.name} className="mb-1 mr-3 block text-left text-sm font-medium text-white">
				{props.label}
			</label>
			<input
				type="text"
				name={props.name}
				id={props.name}
				value={props.value}
				onChange={props.onChange}
				className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline focus:outline-blue-500 focus:ring-blue-500"
				placeholder={props.placeholder}
				disabled={props.disabled}
				required={props.required}
			/>
		</div>
	);
}

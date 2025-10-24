type Props = {
	label: string;
	name: string;
	value: string | undefined;
	placeholder?: string;
	required?: boolean;
	onChange: (event: any) => void;
	className?: string;
};

export default function InputTextareaLabeled(props: Props) {
	return (
		<div>
			<label htmlFor={props.name} className="mb-1 block text-left text-sm font-medium text-white">
				{props.label}
			</label>
			<textarea
				name={props.name}
				id={props.name}
				value={props.value}
				rows={4}
				onChange={props.onChange}
				className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-solid focus:outline-blue-500 focus:ring-blue-500"
				placeholder={props.placeholder}
				required={props.required}
			/>
		</div>
	);
}

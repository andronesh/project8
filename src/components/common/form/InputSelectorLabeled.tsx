type Props = {
	label: string;
	name: string;
	value: string | undefined;
	values: string[];
	required?: boolean;
	onChange: (event: any) => void;
	className?: string;
};

export default function InputSelectorLabeled(props: Props) {
	return (
		<div className="flex flex-row items-center justify-evenly">
			<label htmlFor={props.name} className="pr-3 text-sm font-medium text-white">
				{props.label}
			</label>
			<select
				id={props.name}
				name={props.name}
				value={props.value}
				required={props.required}
				onChange={props.onChange}
				className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-blue-500 focus:outline-solid"
			>
				{props.values.map((value) => (
					<option key={value} value={value}>
						{value}
					</option>
				))}
			</select>
		</div>
	);
}

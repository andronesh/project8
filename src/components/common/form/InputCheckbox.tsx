type Props = {
	label: string;
	name: string;
	value: boolean | undefined;
	onChange: (event: any) => void;
	className?: string;
	disabled?: boolean;
};

export default function InputCheckbox(props: Props) {
	return (
		<div className={props.className}>
			<label className="inline-flex cursor-pointer items-center">
				<input
					type="checkbox"
					name={props.name}
					checked={props.value}
					onChange={props.onChange}
					className="peer sr-only"
					disabled={props.disabled}
				/>
				<div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:rtl:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
				<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{props.label}</span>
			</label>
		</div>
	);
}

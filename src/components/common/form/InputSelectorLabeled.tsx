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
    <div className="flex flex-row justify-evenly items-center">
      <label htmlFor={props.name} className="pr-3 text-sm font-medium text-white">
        {props.label}
      </label>
      <select
        id={props.name}
        name={props.name}
        value={props.value}
        required={props.required}
        onChange={props.onChange}
        className="border text-sm rounded-lg block w-full p-2 text-white bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline focus:outline-blue-500"
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

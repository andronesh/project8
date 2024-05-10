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
      <label
        htmlFor={props.name}
        className="block mb-1 mr-3 text-sm font-medium text-white text-left"
      >
        {props.label}
      </label>
      <input
        type="text"
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        className="border text-sm rounded-lg block w-full p-2 text-white bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500 focus:outline"
        placeholder={props.placeholder}
        disabled={props.disabled}
        required={props.required}
      />
    </div>
  );
}

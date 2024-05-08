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
      <label
        htmlFor={props.name}
        className="block mb-1 text-sm font-medium text-white text-left"
      >
        {props.label}
      </label>
      <textarea
        name={props.name}
        id={props.name}
        value={props.value}
        rows={4}
        onChange={props.onChange}
        className="border text-sm rounded-lg block w-full p-2 text-white bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500 focus:outline"
        placeholder={props.placeholder}
        required={props.required}
      />
    </div>
  );
}

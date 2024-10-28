import { Path, FieldValues, UseFormRegister } from "react-hook-form";

type Inputprops<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  type?: string;
  register: UseFormRegister<TFieldValue>;
  error?: string;
  className?: string;
  onBlur?: (e:React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disabled?: boolean;
};

const InputFeild = <TFieldValue extends FieldValues>({
  label,
  name,
  type = 'text',
  register,
  error,
  className = "sm:col-span-3 sm:col-start-2",
  onBlur,
  formText,
  success,
  disabled
}: Inputprops<TFieldValue>) => {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) =>{
    if(onBlur)
    {
      onBlur(e)
      register(name).onBlur(e)
    }
    else{
      register(name).onBlur(e)

    }
  }
  return (
    <div className={className}>
      <div className="flex justify-between items-center flex-wrap">
        <label
          htmlFor={name}
          className={`block text-sm font-medium leading-6  'text-gray-900'`}
        >
          {label} :
        </label>
        <span className="text-[10px] sm:text-[9px] lg:text-[12px] text-red-500">
          {error}
        </span>
        
          {formText &&  <span className="text-[10px] sm:text-[9px] lg:text-[12px] text-red-500">{formText}</span>}
          {success && <span className="text-green-600 text-[10px] lg:text-[12px] sm:text-[8px]">{success}</span>}
      </div>
      <div className="sm:mt-2 mt-px w-full">
        <input
          {...register(name)}
          onBlur={onBlurHandler}
          id={name}
          type={type}
          disabled={disabled}
          className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default InputFeild;

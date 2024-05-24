import { getCountries } from "@/app/_lib/data-service";

interface IProps {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
}

interface ICountry {
  name: string;
  flag: string;
}

async function SelectCountry({ defaultCountry, name, id, className }: IProps) {
  const countries = await getCountries();
  const flag =
    countries.find((country: ICountry) => country.name === defaultCountry)
      ?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c: ICountry) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;

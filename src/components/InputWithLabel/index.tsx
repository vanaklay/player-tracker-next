import { Input } from '../ui/input';
import { Label } from '../ui/label';

type InputWithLabelProps = {
  label: string;
  type: string;
  id: string;
};
export function InputWithLabel({ label, type, id }: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 self-center">
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} placeholder={label} />
    </div>
  );
}

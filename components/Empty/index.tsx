import { Frown } from 'lucide-react';

type EmptyProps = {
  label: string;
};

export function Empty({ label }: EmptyProps) {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center gap-y-4">
      <div>
        <Frown size={80} />
      </div>
      <p className="text-muted-foregroud text-sm text-center">{label}</p>
    </div>
  );
}

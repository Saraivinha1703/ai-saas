import { Loader2 } from 'lucide-react';

export function Loader() {
  return (
    <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
      <div className="h-full flex flex-col gap-y-4 items-center justify-center">
        <Loader2 size={80} className="relative animate-spin" />
        <p className="text-sm text-muted-foreground">Thinking...</p>
      </div>
    </div>
  );
}

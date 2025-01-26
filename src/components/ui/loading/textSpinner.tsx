import { LoaderCircle } from "lucide-react";

export function LoadingTextSpinner() {
  return (
    <span className="flex gap-2 animate-pulse">
      <LoaderCircle className="animate-spin" />
      <p>Loading...</p>
    </span>
  );
}

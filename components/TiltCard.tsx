import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** @deprecated tilt 3D rimosso (rebrand statico): prop ignorata. */
  strength?: number;
  /** @deprecated tilt 3D rimosso: prop ignorata. */
  minTilt?: number;
  /** @deprecated tilt 3D rimosso: prop ignorata. */
  maxTilt?: number;
};

// Rebrand statico (allineato allo shop): niente tilt 3D ne' glare che segue il
// mouse. Resta un semplice wrapper: mantiene `group relative` cosi' gli hover
// statici dei figli (group-hover:*) continuano a funzionare. API invariata.
export default function TiltCard({ children, className }: Props) {
  return (
    <div className={`group relative ${className ?? ""}`}>{children}</div>
  );
}

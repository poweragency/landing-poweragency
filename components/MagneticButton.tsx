"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** @deprecated effetto magnetico rimosso (rebrand statico): prop ignorata. */
  strength?: number;
  ariaLabel?: string;
  block?: boolean;
  newTab?: boolean;
};

// Rebrand statico (allineato allo shop): niente attrazione magnetica al mouse.
// Resta un semplice feedback di pressione + gli hover CSS gia' sulle classi.
// API invariata cosi' i call-site non cambiano.
export default function MagneticButton({
  children,
  href,
  onClick,
  className,
  ariaLabel,
  block = false,
  newTab = false,
}: Props) {
  const inner = href ? (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );

  return (
    <motion.span
      style={{
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : undefined,
      }}
      whileTap={{ scale: 0.96 }}
    >
      {inner}
    </motion.span>
  );
}

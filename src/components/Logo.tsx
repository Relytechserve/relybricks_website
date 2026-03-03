import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon";
  light?: boolean;
}

export default function Logo({ className = "", variant = "full" }: LogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="RPM RelyBricks Property Management"
      width={variant === "icon" ? 80 : 220}
      height={variant === "icon" ? 40 : 80}
      className={`object-contain object-left ${
        variant === "icon" ? "h-10 w-auto" : "h-12 sm:h-14 lg:h-16 w-auto"
      } ${className}`}
      priority
    />
  );
}

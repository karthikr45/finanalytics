import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-light focus-visible:ring-offset-2 focus-visible:ring-offset-paper [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-emerald text-white shadow-[0_8px_24px_-10px_rgba(15,81,50,0.55)] hover:bg-emerald-light hover:scale-[1.02] active:scale-[0.98]",
        gold: "bg-gold-light text-ink shadow-[0_8px_24px_-8px_rgba(221,192,127,0.55)] hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-ink/15 bg-transparent text-ink hover:bg-ink/[0.04]",
        outlineDark:
          "border border-white/20 bg-transparent text-white hover:bg-white/5",
        secondary: "bg-ink/[0.05] text-ink hover:bg-ink/10",
        ghost: "hover:bg-ink/[0.05] text-ink",
        destructive: "bg-danger text-white hover:opacity-90",
        link: "text-emerald underline-offset-4 hover:underline p-0 h-auto font-medium",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[0.8rem]",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

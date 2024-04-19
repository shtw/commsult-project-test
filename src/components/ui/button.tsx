import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-primary bg-transparent px-4 text-primary transition-[color,box-shadow] duration-700 hover:text-white hover:shadow-[inset_13rem_0_0_0] hover:shadow-primary",
        secondary:
          "border border-white bg-transparent px-4 text-white transition-[color,box-shadow] duration-700 hover:text-primary hover:shadow-[inset_13rem_0_0_0] hover:shadow-white",
        text: "font-medium text-primary",
        "text-secondary": "font-medium text-white",
        link: "relative font-medium text-primary after:absolute after:left-0 after:bottom-0 after:w-0 after:border-b-2 after:border-primary-darken after:transition-all hover:after:w-full",
      },
      icon: {
        default: "justify-between",
      },
      align: {
        default: "justify-center",
        between: "justify-between",
      },
      full: {
        true: "w-full",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "text-[14px]",
        xs: "h-8 px-4 py-2 text-[12px]",
      },
      shrink: {
        true: "p-0 h-auto",
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
  (
    {
      className,
      variant,
      align,
      size,
      full,
      shrink,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            full,
            shrink,
            align,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

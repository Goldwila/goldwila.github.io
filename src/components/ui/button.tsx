import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground textured-bg shadow-lg hover:shadow-xl before:absolute before:inset-0 before:bg-gradient-radial before:from-primary/40 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 textured-bg shadow-lg before:absolute before:inset-0 before:bg-gradient-radial before:from-destructive/30 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        outline: "border border-white/20 textured-bg hover:bg-white/10 hover:border-white/30 backdrop-blur-sm shadow-md hover:shadow-lg before:absolute before:inset-0 before:bg-gradient-radial before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 textured-bg shadow-md before:absolute before:inset-0 before:bg-gradient-radial before:from-secondary/40 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        ghost: "hover:bg-accent hover:text-accent-foreground textured-bg before:absolute before:inset-0 before:bg-gradient-radial before:from-accent/30 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {props.children}
        <span className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay bg-[url('https://uploads-ssl.webflow.com/62e315e219b1655906d39d67/62e3170e2d3e5de3f31f13b6_noise.png')] bg-repeat animate-grain"></span>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

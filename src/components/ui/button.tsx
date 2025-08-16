import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-dlc-silver text-dlc-bg hover:bg-dlc-silver/90 shadow-dlc hover:shadow-dlc-hover",
        destructive: "bg-red-600 text-dlc-text-primary hover:bg-red-600/90",
        outline: "border border-dlc-silver/20 bg-transparent hover:bg-dlc-silver/10 hover:border-dlc-silver/30",
        secondary: "bg-dlc-elevation text-dlc-text-primary hover:bg-dlc-elevation/80",
        ghost: "hover:bg-dlc-silver/10",
        link: "text-dlc-silver underline-offset-4 hover:underline",
        gold: "bg-gradient-to-r from-dlc-gold to-dlc-gold/80 text-dlc-bg hover:from-dlc-gold/90 hover:to-dlc-gold/70",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-md px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

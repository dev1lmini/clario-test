import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  memo
} from "react"
import { twMerge } from "tailwind-merge"


type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const Button = memo(
  forwardRef<HTMLButtonElement, Props>(({ className, ...props }, ref) => (
    <button
      className={twMerge([
        "bg-gradient-to-br px-8 py-3 rounded-full text-white font-bold text-base from-primary-100 to-primary-200"
      ], className)}
      ref={ref}
      {...props}
    ></button>
  ))
)

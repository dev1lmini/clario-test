import { twMerge } from "tailwind-merge"
import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  memo,
  ReactNode
} from "react"

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: string | boolean;
  action?: ReactNode
  valid?: boolean
}

export const Input = memo(
  forwardRef<HTMLInputElement, Props>(
    ({ error, valid, action, ...props }, ref) => {
      return (
        <fieldset className="flex flex-col gap-2 relative w-full">
          <input
            className={twMerge(
              "w-full placeholder:text-sky outline-1 text-midnight outline-sky focus:placeholder:text-midnight font-normal text-base bg-white p  py-2.5 px-5 border border-transparent rounded-[10px] hover:border-sky focus:border-sky",
              error &&
                "bg-blush border-coral text-coral placeholder:text-coral outline-coral",
              valid &&
                "border-emerald text-emerald focus:border-emerald outline-emerald",
                action && "pr-11"
            )}
            ref={ref}
            {...props}
          />
          {error && typeof error === "string" && (
            <p className="text-xs text-coral pl-5">{error}</p>
          )}
          {action && <div className="w-6 absolute right-5 top-0 h-full flex items-center">{action}</div>}
        </fieldset>
      )
    }
  )
)

Input.displayName = "Input"

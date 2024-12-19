import {
  ChangeEventHandler,
  memo,
  useCallback,
  useReducer,
  useRef
} from "react"
import { Button, Input } from "../uikit"
import { useFormik } from "formik"
import { object, string } from "yup"
import eyeIcon from "./assets/eye.svg"
import eyeSlashIcon from "./assets/eye-slash.svg"
import { twMerge } from "tailwind-merge"

const rules = [
  {
    regex: new RegExp("^[^\\s]{8,64}$"),
    message: "8 characters or more (no spaces)"
  },
  {
    regex: new RegExp("^(?=.*[A-Z]).*$"),
    message: "Uppercase and lowercase letters"
  },
  {
    regex: new RegExp("^(?=.*\\d).*$"),
    message: "At least one digit"
  }
]

const validationSchema = object({
  email: string()
    .required("This field is required")
    .email("Invalid email address"),
  password: rules.reduce(
    (schema, { regex, message }) => schema.matches(regex, { message }),
    string().required("This field is required")
  )
})

export const Login = memo(() => {
  const {
    values: { email, password },
    touched,
    submitCount,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors
  } = useFormik({
    onSubmit() {
      alert("Successfully logged in")
    },
    // Override default validation schema to get multiple errors for one field
    validate(values) {
      return validationSchema
        .validate(values, { abortEarly: false })
        .then(() => void 0)
        .catch(({ inner }: { inner: { path: string; message: string }[] }) =>
          inner.reduce(
            (acc, { path, message }) => ({
              ...acc,
              [path]: acc[path]
                ? new Array<string>().concat(acc[path], message)
                : message
            }),
            {} as { [x: string]: string | string[] }
          )
        )
    },
    validateOnBlur: true,
    validateOnChange: false,
    validateOnMount: false,
    initialValues: {
      email: "",
      password: ""
    }
  })

  const [showPassword, togglePassword] = useReducer(state => !state, false)

  // Store errors to access it avoiding re-renders
  const errorsRef = useRef(errors)
  errorsRef.current = errors

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
    const name = event.target.name as keyof typeof errors
    const value = event.target.value
    /** Validate field once there is an error to provide instant feedback on issue resolving */
    setFieldValue(name, value, Boolean(errorsRef.current[name]))
  }, [])

  return (
    <section className="w-full flex flex-col items-center justify-center gap-10 relative ">
      <h1 className="font-bold text-3xl text-midnight">Sign up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-10 w-full max-w-80"
      >
        <section className="flex flex-col items-center gap-5 w-full">
          <Input
            onChange={onChange}
            onBlur={handleBlur}
            valid={touched.email && !errors.email}
            name="email"
            value={email}
            error={(touched.email || !!submitCount) && errors.email}
            type="email"
            placeholder="Email"
          />
          <Input
            onChange={onChange}
            onBlur={handleBlur}
            valid={touched.email && !errors.password}
            error={
              (touched.password || !!submitCount) && Boolean(errors.password)
            }
            action={
              <button type="button" onClick={togglePassword}>
                <img
                  src={showPassword ? eyeIcon : eyeSlashIcon}
                  alt={showPassword ? "Hide password" : "Show password"}
                />
              </button>
            }
            name="password"
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <ul className="pl-5 gap-1 w-full">
            {rules.map(({ message, regex }) => (
              <li
                key={message}
                className={twMerge(
                  "text-xs text-midnight leading-5",
                  regex.test(password) && "text-emerald",
                  errors.password &&
                    (touched.password || !!submitCount) &&
                    new Array<string>()
                      .concat(errors.password)
                      .includes(message) &&
                    "text-coral"
                )}
              >
                {message}
              </li>
            ))}
          </ul>
        </section>

        <Button type="submit" className="w-[240px]">
          Sign up
        </Button>
      </form>
    </section>
  )
})

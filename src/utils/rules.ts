import * as yup from 'yup'
const settings = [
    {
        key: 'email',
        value: /^[0-9a-z@]$/,
        message: 'Email not format'
    },
    {
        key: 'email_required',
        value: true,
        message: 'Firld is not the blank'
    },
    {
        key: 'password_required',
        value: true,
        description: 'The password field not blank'
    },
    {
        key: 'password_max',
        value: 30,
        description: 'Password must be 8-10 characters and contain both numbers and letters.'
    },
    {
        key: 'password_min',
        value: 0,
        description: 'Password must be 8-10 characters and contain both numbers and letters.'
    }
]
export const schemaRegister = yup
    .object({
        email: yup
            .string()
            .required('The email field not blank!')
            .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Incorrect email format.'),
        password: yup
            .string()
            .required('The password field not blank')
            .min(6, 'Password must be 8-10 characters and contain both numbers and letters.')
            .max(150, 'Password must be 8-10 characters and contain both numbers and letters.'),
        confirmPassword: yup
            .string()
            .required('The confirm password field not blank')
            .oneOf([yup.ref('password')], "Passwords don't match.")
    })
    .required()
export const loginSchema = schemaRegister.omit(['confirmPassword'])

export type SchemaLogin = yup.InferType<typeof loginSchema>
export type SchemaRegister = yup.InferType<typeof schemaRegister>

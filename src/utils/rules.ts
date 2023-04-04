import * as yup from 'yup'

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

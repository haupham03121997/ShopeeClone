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

const handleConfirmPasswordYup = (refString: string) => {
    return yup
        .string()
        .required('Nhập lại password là bắt buộc')
        .min(6, 'Độ dài từ 6 - 160 ký tự')
        .max(160, 'Độ dài từ 6 - 160 ký tự')
        .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
    const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
    if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
    }
    return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
    email: yup
        .string()
        .required('Email là bắt buộc')
        .email('Email không đúng định dạng')
        .min(5, 'Độ dài từ 5 - 160 ký tự')
        .max(160, 'Độ dài từ 5 - 160 ký tự'),
    password: yup
        .string()
        .required('Password là bắt buộc')
        .min(6, 'Độ dài từ 6 - 160 ký tự')
        .max(160, 'Độ dài từ 6 - 160 ký tự'),
    confirm_password: handleConfirmPasswordYup('password'),
    price_min: yup.string().test({
        name: 'price-not-allowed',
        message: 'Giá không phù hợp',
        test: testPriceMinMax
    }),
    price_max: yup.string().test({
        name: 'price-not-allowed',
        message: 'Giá không phù hợp',
        test: testPriceMinMax
    }),
    name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export const userSchema = yup.object({
    name: yup.string().max(160, 'The maximum length is 160 characters'),
    phone: yup
        .string()
        .max(20, 'The maximum length is 20 characters')
        .test('phone', 'Phone nuber invalid', (phoneValue) => {
            if (phoneValue && !phoneValue.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/)) return false
            return true
        }),
    address: yup.string().max(160, 'The maximum length is 160 characters'),
    avatar: yup.string().max(1000, 'The maximum length is 1000 characters'),
    date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
    password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
    new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
    confirm_password: handleConfirmPasswordYup('new_password') as yup.StringSchema<
        string | undefined,
        yup.AnyObject,
        undefined,
        ''
    >
})

export type SchemaLogin = yup.InferType<typeof loginSchema>
export type SchemaRegister = yup.InferType<typeof schemaRegister>

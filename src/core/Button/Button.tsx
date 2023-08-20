import { Button as ButtonAntd, ButtonProps } from 'antd'

interface Props extends ButtonProps {
    label?: string
}
function Button(props: Props) {
    const { ...restProps } = props
    return <ButtonAntd {...restProps}>Button</ButtonAntd>
}

export default Button

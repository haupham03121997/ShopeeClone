import type { Meta, StoryObj } from '@storybook/react'

import HeaderCard from './HeaderCard'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
    title: 'HeaderCard/Components',
    component: HeaderCard,
    tags: ['autodocs']
} satisfies Meta<typeof HeaderCard>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {}
}

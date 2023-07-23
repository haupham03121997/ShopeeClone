export type PayloadData = {
    title?: string
    content?: string
    actionButton?: string
    action: () => void
}

export type Handle = {
    confirm: (data: PayloadData) => void
    handleClose: () => void
}

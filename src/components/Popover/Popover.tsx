import {
    arrow,
    FloatingPortal,
    offset,
    Placement,
    safePolygon,
    shift,
    useFloating,
    useHover,
    useInteractions
} from '@floating-ui/react'

import React, { FC, useId, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
    children: React.ReactNode
    renderPopover: React.ReactNode
    className?: string
    placement?: Placement
}

const Popover: FC<Props> = ({ children, renderPopover, className, placement }): JSX.Element => {
    const id = useId()
    const arrowRef = useRef<HTMLElement | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { x, y, strategy, refs, context, middlewareData } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'bottom-start',
        middleware: [shift(), offset(), arrow({ element: arrowRef })]
    })

    const hover = useHover(context, {
        handleClose: safePolygon()
    })
    const { getReferenceProps, getFloatingProps } = useInteractions([hover])

    const showPopover = () => setIsOpen(true)
    const hiddenPopover = () => setIsOpen(false)
    return (
        <div ref={refs.setReference} {...getReferenceProps()} onMouseLeave={hiddenPopover} onMouseEnter={showPopover}>
            {children}
            <FloatingPortal id={id}>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.2 }}
                            className={className}
                            ref={refs.setFloating}
                            {...getFloatingProps()}
                            style={{
                                position: strategy,
                                top: `${y ? y + 20 : y}px` ?? 0,
                                left: x ?? 0,
                                width: 'max-content',
                                transformOrigin: `${middlewareData.arrow?.x}px left`,
                                borderColor: '#333333'
                            }}
                        >
                            {renderPopover}
                        </motion.div>
                    )}
                </AnimatePresence>
            </FloatingPortal>
        </div>
    )
}

export default Popover

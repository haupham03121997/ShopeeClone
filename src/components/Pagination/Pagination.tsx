import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

interface Props {
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    pageSize: number
}

const RANGE = 2

const Pagination: FC<Props> = ({ page, pageSize, setPage }): JSX.Element => {
    const renderPagination = () => {
        let dotAfter = false
        let dotBefore = false

        const renderDotBefore = (index: number) => {
            if (!dotBefore) {
                dotBefore = true
                return (
                    <button
                        key={index}
                        className='mx-2 cursor-pointer rounded border-transparent bg-white px-3 py-2 shadow-sm'
                    >
                        ...
                    </button>
                )
            }
            return null
        }

        const renderDotAfter = (index: number) => {
            if (!dotAfter) {
                dotAfter = true
                return (
                    <button
                        key={index}
                        className='mx-2 cursor-pointer rounded border-transparent bg-white px-3 py-2 shadow-sm'
                    >
                        ...
                    </button>
                )
            }
            return null
        }

        return Array(pageSize)
            .fill(0)
            .map((_, index) => {
                const pageNumber = index + 1

                if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
                    return renderDotBefore(pageNumber)
                } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
                    if (pageNumber < page - RANGE && pageNumber > RANGE) {
                        return renderDotBefore(pageNumber)
                    } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
                        return renderDotAfter(pageNumber)
                    }
                }
                return (
                    <button
                        key={index}
                        onClick={() => setPage(pageNumber)}
                        className={classnames('mx-2 cursor-pointer rounded  border py-2 px-4 font-bold ', {
                            'border-green-700': page === pageNumber,
                            'border-transparent': page !== pageNumber
                        })}
                    >
                        {pageNumber}
                    </button>
                )
            })
    }
    return (
        <div className='mt-6 flex flex-wrap justify-center'>
            <button className='mx-2 cursor-pointer rounded border-transparent bg-white px-3 py-2 shadow-sm'>
                Prev
            </button>
            {renderPagination()}
            <button className='mx-2 cursor-pointer  rounded border-transparent bg-white px-3 py-2 shadow-sm'>
                Next
            </button>
        </div>
    )
}

export default Pagination

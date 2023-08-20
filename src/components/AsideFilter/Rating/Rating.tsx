import { Col, Row } from 'antd'
import { CloseSquare, Star } from 'react-iconly'
import classnames from 'classnames'
import useQueryParams from 'src/hooks/useQueryParams'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { PATH } from 'src/constants/path'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'

const listStars = [
    {
        name: '5 Star',
        value: '5'
    },
    {
        name: '4 Star',
        value: '4'
    },
    {
        name: '3 Star',
        value: '3'
    },
    {
        name: '2 Star',
        value: '2'
    },
    {
        name: '1 Star',
        value: '1'
    }
]

const Rating = (): JSX.Element => {
    const navigate = useNavigate()
    const queryParams: QueryConfig = useQueryParams()
    const hasPriceParams = 'rating_filter' in queryParams

    const handleRating = (rating: string) => {
        navigate({
            pathname: PATH.HOME,
            search: createSearchParams({ ...queryParams, rating_filter: rating }).toString()
        })
    }
    const handleClearFilter = () => {
        const newParams = omit({ ...queryParams }, ['rating_filter'])

        navigate({
            pathname: PATH.HOME,
            search: createSearchParams(newParams).toString()
        })
    }

    return (
        <Row className='mt-6'>
            <Col span={24} className='mb-3'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <Star set='curved' size={20} primaryColor='#6b7280' />
                        <span className='inline-block pl-2 text-base font-normal tracking-wide text-gray-500'>
                            Rating
                        </span>
                    </div>
                    {hasPriceParams && (
                        <span className='cursor-pointer text-xs text-red-600' onClick={handleClearFilter}>
                            <CloseSquare size={14} />
                        </span>
                    )}
                </div>
            </Col>
            <Col span={24} className='flex flex-col gap-6 pt-4'>
                {listStars.map((item) => {
                    const ratingActive = queryParams.rating_filter === item.value
                    return (
                        <div
                            className=' flex cursor-pointer items-center gap-4'
                            key={`aside-star-${item.value}`}
                            onClick={() => handleRating(item.value)}
                        >
                            <div
                                className={classnames('border-1 h-4 w-4  rounded-full border-solid border-slate-400', {
                                    'bg-slate-400': ratingActive
                                })}
                            />
                            <span className='text-gray-400'>{item.name}</span>
                        </div>
                    )
                })}
            </Col>
        </Row>
    )
}

export default Rating

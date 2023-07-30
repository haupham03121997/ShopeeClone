import { useQuery } from '@tanstack/react-query'
import { Col, Row, Skeleton } from 'antd'
import { Category as CategoryIcon, CloseSquare } from 'react-iconly'
import categoryApis from 'src/apis/category.api'
import classnames from 'classnames'
import useQueryParams from 'src/hooks/useQueryParams'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import { PATH } from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

const Category = (): JSX.Element => {
    const navigate = useNavigate()
    const queryParams: QueryConfig = useQueryParams()
    const { data, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: () => {
            return categoryApis.getCategories()
        }
    })

    const categories = data?.data.data || []

    const { category } = queryParams

    const handleClick = (idCategory: string) => {
        navigate({
            pathname: '/',
            search: createSearchParams({
                ...queryParams,
                category: idCategory
            }).toString()
        })
    }
    const hasCategoryParams = 'category' in queryParams

    const handleClearFilter = () => {
        const newParams = omit({ ...queryParams }, ['category'])
        navigate({
            pathname: PATH.HOME,
            search: createSearchParams(newParams).toString()
        })
    }
    return (
        <Row className='my-6'>
            <Col span={24} className='mb-3'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <CategoryIcon set='curved' size={20} primaryColor='#6b7280' />
                        <span className='inline-block pl-2 text-base font-normal tracking-wide text-gray-500'>
                            Category
                        </span>
                    </div>
                    {hasCategoryParams && (
                        <span className='cursor-pointer text-xs text-red-600' onClick={handleClearFilter}>
                            <CloseSquare size={14} />
                        </span>
                    )}
                </div>
            </Col>
            <Col span={24} className='flex flex-col gap-6 pt-4'>
                {isLoading && <Skeleton />}
                {!isLoading &&
                    categories.map((categoryItem) => {
                        return (
                            <div
                                className='flex cursor-pointer items-center gap-4'
                                key={categoryItem._id}
                                onClick={() => handleClick(categoryItem._id)}
                            >
                                <div
                                    className={classnames(
                                        ' border-1 h-4 w-4 rounded-full border-solid border-slate-400',
                                        {
                                            'bg-slate-400': category === categoryItem._id
                                        }
                                    )}
                                />
                                <span className='text-gray-400'>{categoryItem.name}</span>
                            </div>
                        )
                    })}
            </Col>
        </Row>
    )
}

export default Category

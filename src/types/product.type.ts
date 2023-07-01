export interface Product {
    _id: string
    images: string[]
    price: number
    rating: number
    price_before_discount: number
    quantity: number
    sold: number
    view: number
    name: string
    description: string
    category: {
        _id: string
        name: string
    }
    image: string
    createdAt: Date
    updatedAt: Date
}

export interface ProductList {
    products: Product[]
    pagination: {
        page: number
        limit: number
        page_size: number
    }
}

export interface ProductListConfig {
    page?: number | string
    limit?: number | string
    sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
    order?: 'asc' | 'desc'
    exclude?: string
    rating_filter?: string
    price_max?: string
    price_min?: string
    category?: string
}

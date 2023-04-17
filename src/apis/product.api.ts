import { ProductList, ProductListConfig, Product } from 'src/types/product.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const productApi = {
    getProductList: (params: ProductListConfig) => http.get<SuccessResponseApi<ProductList>>('/products', { params }),
    getProductDetail: (id: string) => http.get<SuccessResponseApi<Product>>(`/products/${id}`)
}

export { productApi }

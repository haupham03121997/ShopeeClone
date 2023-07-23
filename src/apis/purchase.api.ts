import { Purchase, PurchaseListStatus } from 'src/types/purchaces.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

interface PurChaseParams {
    product_id: string
    buy_count: number
}

const purchaseApi = {
    addToCard: (body: PurChaseParams) => http.post<SuccessResponseApi<Purchase>>('/purchases/add-to-cart', body),
    updatePurchase: (body: PurChaseParams) =>
        http.post<SuccessResponseApi<Purchase>>('/purchases/update-purchase', body),
    getPurchases: (params: { status: number }) =>
        http.get<SuccessResponseApi<Purchase[]>>(`/purchases?status`, { params }),
    deletePurchase: (purchaseIds: string[]) =>
        http.delete<SuccessResponseApi<{ deleted_count: number }>>(`/purchases`, {
            data: purchaseIds
        })
}

export { purchaseApi }

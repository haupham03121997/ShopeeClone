import { Product } from './product.type'

/**
  -1: product in cart
  0: all products
  1: product waiting for confirm from the shop owner
  2: product are being picked up
  3: product is shipping
  4: product is delivering
  5: product is canceled
 */
export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = PurchaseStatus | 0

export interface Purchase {
    _id: string
    buy_count: number
    price: number
    price_before_discount: number
    status: PurchaseStatus
    user: string
    product: Product
    createdAt: string
    updatedAt: string
}

export interface ExtendedPurchase extends Purchase {
    disabled: boolean
    checked: boolean
}

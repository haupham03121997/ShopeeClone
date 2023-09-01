import { isAxiosError } from 'axios'
import { describe, it, expect } from 'vitest'

describe('isAxiosError', () => {
    // it dùng để ghi chú trường hợp cần test
    it('isAxiosError trả về boolean', () => {
        expect(isAxiosError({ message: 'hello', data: true })).toBe(false)
    })
})

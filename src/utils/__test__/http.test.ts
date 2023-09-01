import { describe, expect, it } from 'vitest'
import http from '../http'
import { HttpStatusCode } from 'axios'

describe('http Axios', () => {
    it('call api', async () => {
        const res = await http.get('products')
        expect(res.status).toBe(HttpStatusCode.Ok)
    })
    it('Auth request', async () => {
        await http.post('login', {
            email: 'd7@gmail.com',
            password: '123123'
        })
        const res = await http.get('/me')
        console.log(res)
        expect(res.status).toBe(HttpStatusCode.Ok)
    })
})

import { describe, expect, it } from 'vitest'
import { setAccessTokenToLS } from '../auth'

const access_token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmJmMGM1NmQ3YzYyMDM0MDg1ODhkMiIsImVtYWlsIjoiaGF1cGhhbTAzMTJAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wOC0yNlQwMToyMDo1Ny42NTlaIiwiaWF0IjoxNjkzMDEyODU3LCJleHAiOjE2OTMwMTI4Njd9.Nj7pJ9l4HBC5wxyvutn7aXE_MWMReSq8_BNTwfRtwcY'

const refresh_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmJmMGM1NmQ3YzYyMDM0MDg1ODhkMiIsImVtYWlsIjoiaGF1cGhhbTAzMTJAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wOC0yNlQwMToyMTo0Ny40NDVaIiwiaWF0IjoxNjkzMDEyOTA3LCJleHAiOjE2OTMwMTY1MDd9.n_RPiNqzyClkRgcW6ce6vRFpwHqIdFv9w0PhAg0HwyE'

describe('setAccessTokenToLS', () => {
    it('access_token set vao local storage', () => {
        setAccessTokenToLS(access_token)
        expect(localStorage.getItem('access_token')).toBe(access_token)
    })
})

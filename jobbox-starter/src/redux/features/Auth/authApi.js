import apiSlice from '../Api/apiSlice'

const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: data => ({
        method: 'POST',
        url: 'user',
        body: data
      })
    })
  })
})

export const {useRegisterMutation} = authApi

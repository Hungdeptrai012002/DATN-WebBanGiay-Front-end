import { axiosJWT } from "./UserService"

// export const createProduct = async (data) => {
//     const res = await axios.post(`http://localhost:3000/api/product/create`, data)
//     return res.data
// }
export const createOrder = async ( data, access_token) => {
    const res = await axiosJWT.post(`http://localhost:3000/api/order/create`, data, {
        headers:{
            token : `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getOrderByUserId = async ( id, access_token) => {
    const res = await axiosJWT.get(`http://localhost:3000/api/order/getOrderDetails/${id}`, {
        headers:{
            token : `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getDetailsOrder = async ( id, access_token) => {
    const res = await axiosJWT.get(`http://localhost:3000/api/order/getDetailsOrder/${id}`, {
        headers:{
            token : `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const cancelOrder = async ( id, access_token, orderItems) => {
    const res = await axiosJWT.delete(`http://localhost:3000/api/order/cancelOrder/${id}`,{data: orderItems}, {
        headers:{
            token : `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getAllOrder = async ( id, access_token, orderItems) => {
    const res = await axiosJWT.get(`http://localhost:3000/api/order/getAllOrder`, {
        headers:{
            token : `Bearer ${access_token}`,
        }
    })
    return res.data
}
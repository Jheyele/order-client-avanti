import api from "./Api"

export const getAllOrders = async () => {
    try {
        const response = await api.get(`/orders`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch orders');
    }
};

export const getOrderById = async (orderId) => {
    try {
        const response = await api.get(`/order/${orderId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch order');
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await api.post(`/order`, orderData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create order');
    }
};

export const updateOrder = async (orderId, orderData) => {
    try {
        const response = await api.put(`/order/${orderId}`, orderData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update order');
    }
};

export const deleteOrderById = async (orderId) => {
    try {
        await api.delete(`/order/${orderId}`);
    } catch (error) {
        throw new Error('Failed to delete order');
    }
};

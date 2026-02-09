import axios from 'axios';

const APP_URL = `http://localhost:3000/products`;
export const productServices = {
    getAllproduct: async () => {
        try {
            const response = await axios.get(APP_URL);
            return response.data.data;
            console.log("Get Data Is Successfully....!");

        } catch (err) {
            console.log('Error fetching is faild', err);
        }
    },

    createProduct: async (data) => {
        try {
            const response = await axios.post(APP_URL, data,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });
            return response.data.data;
            console.log("Create Data Is Successfully....!");
        } catch (err) {
            console.log('Error Create is faild', err);
        }
    },

    getById: async (id) => {
        try {
            const response = await axios.get(`${APP_URL}/${id}`);
            return response.data.data;
            console.log("GetById Data Is Successfully....!");

        } catch (err) {
            console.log('Error GetById is faild', err);
        }
    },

    updateProduct: async (id, data) => {
        try {
            const response = await axios.put(`${APP_URL}/${id}`, data);
            return response.data.data;
            console.log("Update Data is successfully...!");

        } catch (err) {
            console.log('Error Update is faild', err);
        }
    },

    deleteProduct: async (id) => {
        try {
            const response = await axios.delete(`${APP_URL}/${id}`);
            return response.data.data;
            console.log("Delete Data is successfully...!");
        } catch (err) {
            console.log('Error Delete is faild', err);
        }
    },

    getDashboardStats: async () => {
        try {
            const response = await axios.get(`/analytics/dashboard`);
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            throw error;
        }
    },

    // Get sales data
    getSalesData: async (startDate, endDate) => {
        try {
            const response = await api.get(`/analytics/sales?start=${startDate}&end=${endDate}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching sales data:', error);
            throw error;
        }
    },

}
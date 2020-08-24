import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage"
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// const baseURL = "http://localhost:3000/api/v2"; // DEV
const baseURL = "https://servicemeng.herokuapp.com/api/v2"; // TEST

const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem("token")
        if (value !== null) {
            return value
        }
    } catch (e) {
        console.log(e)
        return "emptyToken";
    }
}

const post = async (url, body) => {
    const keys = Object.keys(body);
    keys.forEach(key => {
        const val = body[key];
        if(val === undefined || val === null || val === "") {
            delete body[key];
        }
    })
    console.log(body)
    try {
        const response = await axios.post(baseURL + url, { ...body }, {
            headers: {
                'Content-Type': "application/json",
                "Authorization": await getToken()
            }
        })
        return response.data;
    } catch (error) {
        console.log(error)
        return { status: 10, description: "There was an error connecting to the server" }
    }
}

const get = async (url) => {
    try {
        const response = await axios.get(baseURL + url, {
            headers: {
                'Content-Type': "application/json",
                "Authorization": await getToken()
            }
        })
        console.log(response.data)
        return response.data;
    } catch (error) {
        return { status: 10, description: "There was an error connecting to the server" }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const login = async (email, password) => {
    try {
        return await post("/auth/provider/login", { email, password });
    } catch (error) {
        return { status: 10, description: "There was an error connecting to the server" }
    }
}

export const register = async (firstName, lastName, email, phone, password, isProvider, subscribe) => {
    try {
        return await post("/auth/provider/register", { firstName, lastName, email, phone, password, isProvider, subscribe });
    } catch (error) {
        return { status: 10, description: "There was an error connecting to the server" }
    }
}

export const changePassword = async (oldPassword, newPassword) => {
    try {
        return await post("/auth/provider/change-password", { oldPassword, newPassword });
    } catch (error) {
        return { status: 10, description: "There was an error connecting to the server" }
    }
}

export const getProfile = async () => {
    try {
        return await get("/providers/profile")
    } catch (error) {
        console.log(error)
        return { status: 10, description: "There was an error connecting to the server" }
    }
}

export const getCategories = async () => {
    try {
        return await get("/categories")
    } catch (error) {
        console.log(error)
        return { status: 10, description: "There was an error connecting to the server" }
    }
}

export const searchBusinesses = async (categoryId, stateCode, lga) => {
    try {
        return await post("/businesses/search", {categoryId, stateCode, lga})
    } catch (error) {
        console.log(error)
        return { status: 10, description: "There was an error connecting to the server" }
    }
}

export const addBusiness = async(businessName, streetAddress, state, lga, landmark, providerId, categoryId, email, phone) => {
    try {
        return await post("/providers/business", {businessName, streetAddress, state, lga, landmark, providerId, categoryId, email, phone})
    } catch (error) {
        return { status: 10, description: "There was an error connecting to the servers boy" }
    }
}

export const updateBusiness = async(businessId, business) => {
    try {
        return await post(`/providers/business/${businessId}`, {...business})
    } catch (error) {
        return { status: 10, description: "There was an error connecting to the servers boy" }
    }
}

export const addBusinessImage = async(businessId, image) => {
    try {
        return await post(`/providers/business/${businessId}/images`, {image})
    } catch (error) {
        return { status: 10, description: "There was an error connecting to the servers boy" }
    }
}

export const addVisitor = async(ip, businessId, customerId, longitude, latitude, deviceId) => {
    try {
        return await post(`/visitors`, {ip, businessId, customerId, longitude, latitude, deviceId})
    } catch (error) {
        return { status: 10, description: "There was an error connecting to the servers boy" }
    }
}

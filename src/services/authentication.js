import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage"
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

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

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v2/',
    timeout: 30000,
    headers: {
        'Content-Type': "application/json"
    }
});

const post = async (url, body) => {
    try {
        const response = await axios.post('http://localhost:3000/api/v2' + url, { ...body }, {
            headers: {
                'Content-Type': "application/json",
                "Authorization": await getToken()
            }
        })
        return response.data;
    } catch (error) {
        return { status: 10, description: "There was an error connecting to the server" }
    }
}

const get = async (url) => {
    try {
        const response = await axios.get('http://localhost:3000/api/v2' + url, {
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

export const login = async (email, password) => {
    try {
        return await post("/auth/provider/login", { email, password });
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


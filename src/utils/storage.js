import AsyncStorage from "@react-native-community/async-storage";

const getCategories = async() => {
    const categories = await AsyncStorage.getItem("categories");
    console.log("Categories", categories)
    if(categories === null)  {
        return null;
    } else {
        return JSON.parse(categories);
    }
}

const getProfile = async() => {
    const profile = await AsyncStorage.getItem("profile");
    if(profile === null)  {
        return null;
    } else {
        return JSON.parse(profile);
    }
}

export default { getCategories, getProfile }
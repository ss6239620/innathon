import axios from "axios";
import { API_URL, API_URL_AIML } from "../constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function PostBlog(title, titleBody) {
    console.log('inside blogs');
    const token = await AsyncStorage.getItem("doctorToken");
    console.log(token);
    const body = {
        "title": "65cb89c7c108c144e836d1f0",
        "description": "65cb89c7c108c144e836d1f0"
    }
    const config = {
        headers: {
            'auth-token': token,
        }
    }

    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/blog/postblog`, body, config)
            .then(async (response) => {
                try {
                    console.log(response.data);
                    // console.log(response);
                    resolve(response)
                } catch (e) { reject(e) }
            }).catch((err) => {
                console.log(err.response.data);
                reject(err)
            })
    })
}

async function PostTask(todo, priority) {
    // console.log(typeof priority);
    const token = await AsyncStorage.getItem('userToken')
    console.log(token);
    const body = {
        "todo": todo,
        "priority": priority
    }
    const config = {
        headers: {
            'auth-token': token,
        }
    }

    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/todo/posttodo`, body, config)
            .then(async (response) => {
                try {
                    console.log(response.data);
                    // console.log(response);
                    resolve(response)
                } catch (e) { reject(e) }
            }).catch((err) => {
                console.log(err.response.data);
                reject(err)
            })
    })
}


async function DeleteTask(id) {
    const token = await AsyncStorage.getItem('userToken')

    const config = {
        headers: {
            'auth-token': token,
        }
    }

    return new Promise((resolve, reject) => {
        axios.delete(`${API_URL}/todo/deletetodo/${id}`, config)
            .then(async (response) => {
                try {
                    console.log(response.data);
                    resolve(response)
                } catch (e) { reject(e) }
            }).catch((err) => {
                console.log(err.response.data);
                reject(err)
            })
    })
}

async function PostNotes(notes) {
    // console.log(typeof priority);
    const token = await AsyncStorage.getItem('userToken')

    console.log(token);
    const body = {
        note: notes

    }
    const config = {
        headers: {
            'auth-token': token,
        }
    }

    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/note/addnote`, body, config)
            .then(async (response) => {
                try {
                    console.log(response.data);
                    // console.log(response);
                    resolve(response)
                } catch (e) { reject(e) }
            }).catch((err) => {
                console.log(err.response.data);
                reject(err)
            })
    })
}

async function getScore() {
    const token = await AsyncStorage.getItem('userToken')

    const config = {
        headers: {
            'auth-token': token,
        }
    }

    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/todo/fetchmytodoscore`, config)
            .then(async (response) => {
                try {
                    resolve(response)
                } catch (e) { reject(e) }
            }).catch((err) => {
                console.log(err.response.data);
                reject(err)
            })
    })
}

async function PostScore(score) {
    // console.log(typeof priority);
    const token = await AsyncStorage.getItem('userToken')

    console.log(token);
    const body = {
        score: score
    }
    const config = {
        headers: {
            'auth-token': token,
        }
    }

    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/todo/posttodosscore`, body, config)
            .then(async (response) => {
                try {
                    console.log(response.data);
                    // console.log(response);
                    resolve(response)
                } catch (e) { reject(e) }
            }).catch((err) => {
                console.log(err.response.data);
                reject(err)
            })
    })
}

async function SentimentRequest(query) {
    // console.log(typeof priority);
    const body = {
        query: query
    }

    return new Promise((resolve, reject) => {
        axios.post(`${API_URL_AIML}/postquery/`, body)
            .then(async (response) => {
                try {
                    console.log(response.data);
                    // console.log(response);
                    resolve(response)
                } catch (e) { reject(e) }
            }).catch((err) => {
                console.log(err.response.data);
                reject(err)
            })
    })
}


async function getMySentiment() {
    // console.log(typeof priority);
    const token = await AsyncStorage.getItem('userToken')

    const config = {
        headers: {
            'auth-token': token,
        }
    }

    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/sentiments/fetchmysentiments`,config)
            .then(async (response) => {
                try {
                    console.log(response.data);
                    // console.log(response);
                    resolve(response)
                } catch (e) { reject(e) }
            }).catch((err) => {
                console.log(err.response.data);
                reject(err)
            })
    })
}

async function fetchmysentiments() {
    const token = await AsyncStorage.getItem('userToken')
    console.log(token);
    
    const config = {
        headers: {
            'auth-token': token,
        }
    }

    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/user/genapi`,{},config)
            .then(async (response) => {
                try {
                    resolve(response)
                } catch (e) { reject(e) }
            }).catch((err) => {
                console.log(err.response.data);
                reject(err)
            })
    })
}

async function fetchUserName() {
    const token = await AsyncStorage.getItem('userToken')

    const config = {
        headers: {
            'auth-token': token,
        }
    }

    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/user/getuser`, config)
            .then(async (response) => {
                try {
                    resolve(response)
                } catch (e) { reject(e) }
            }).catch((err) => {
                console.log(err.response.data);
                reject(err)
            })
    })
}

export const BlogServices = { PostBlog, PostTask, DeleteTask, PostNotes, getScore, PostScore,SentimentRequest,getMySentiment,fetchmysentiments,fetchUserName }
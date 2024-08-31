import axios from "axios"
import { HEALTH_NEWS_API_KEY } from "../constant";

function FetchArticles() {
    return new Promise((resolve, reject) => {
        axios.get(
            `https://newsapi.org/v2/everything?q=bitcoin&pageSize=10&apiKey=febc993c6612455a90be3ff8827649ee}`
        ).then(async (response) => {
            try {
                resolve(response)
            } catch (e) { reject(e) }
        }).catch((err) => {
            reject(err)
        })
    })
}


export const articlesServices={
    FetchArticles
}
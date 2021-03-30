import React, { useState, useEffect } from 'react';
import globalConfig from "../config.js"
import { useApi } from 'react-use-fetch-api';
import Article from "./Article.js"
import ListArticles from "./ListArticles.js"

var cacheArticles = []

import {
    Link,
    useLocation
} from "react-router-dom";

function GetArticle(props) {
    const location = useLocation()
    const actualUrl = location.pathname.split('/')
    const { get } = useApi()
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)
    const lang = actualUrl[2]
    const category = actualUrl[3]
    const id = actualUrl[4]
    const cacheContent = lang + category + id

    useEffect(() => {
        if (cacheArticles[cacheContent]) {
            setLoading(false)
            setData(cacheArticles[cacheContent])
        } else {
            get(globalConfig.host + '/v1/article?lang=' + lang + '&category=' + category + '&id=' + id).then(data => {
                data.pathname = "http://fluidy.news" + props.pathname
                cacheArticles[cacheContent] = data
                setLoading(false)
                setData(data)
            })
        }
    }, [location]);

    return (
        <>
            {loading &&
                <Link to="/">
                    Loading...
        		</Link>
            }
            {!loading && data &&
                <>
                    <Article elem={data}></Article>
                    <ListArticles />
                </>
            }
        </>
    )
}

export default GetArticle;
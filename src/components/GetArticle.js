import React, { useState, useRef, useEffect } from 'react';
import globalConfig from "../config.js"
import { useApi } from 'react-use-fetch-api';
import Article from "./Article.js"
import ListArticles from "./ListArticles.js"

import {
    Link,
    Redirect,
    useLocation
} from "react-router-dom";

function GetArticle() {
    const location = useLocation()
    const actualUrl = location.pathname.split('/')
    const { get } = useApi()
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (actualUrl.length !== 6) {
            return <Redirect to='/' />
        } else {
            get(globalConfig.host + '/v1/article?lang=' + actualUrl[2] + '&category=' + actualUrl[3] + '&id=' + actualUrl[4]).then(data => {
                setLoading(false)
                setData(data)
            })
        }
    }, [location]);

    return (
        <>
            {loading &&
                <Link to="/">
                    CANCEL LOADING CATEGORIES
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
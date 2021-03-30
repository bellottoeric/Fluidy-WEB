import React, { useState, useRef, useEffect } from 'react';
import globalConfig from "../config.js"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CardArticle from "./CardArticle.js"
import { useApi } from 'react-use-fetch-api';
import {
    Link,
    useLocation
} from "react-router-dom";
import { motion } from "framer-motion"

var cacheCardArticles = []

const CustomStyle = {
    containerHeader: {
        "marginTop": "5%",
        "marginBottom": "5%",
    },
    containerArticles: {
        display: 'flex',
        'flexFlow': 'row wrap',
        'alignItems': 'center',
        'justifyContent': 'center'
    },
    containerArticle: isRowBased => ({
        "width": isRowBased ? '400px' : '90vw',
        "height": "500px",
    }),
    containerArticleIn: {
        "height": "500px",
    },
}

function ListArticles() {
    const location = useLocation()
    const actualUrl = location.pathname.split('/')
    const { get } = useApi()
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)
    const mediaMatch = window.matchMedia('(min-width: 500px)');
    const [matches, setMatches] = useState(mediaMatch.matches);
    const lang = actualUrl[2]
    const category = actualUrl[3]
    const cacheContent = lang + category

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addListener(handler);
        return () => mediaMatch.removeListener(handler);
    });

    useEffect(() => {
        if (cacheCardArticles[cacheContent]) {
            setLoading(false)
            setData(cacheCardArticles[cacheContent])
        } else {
            get(globalConfig.host + '/v1/articles?lang=' + lang + '&category=' + category).then(data => {
                cacheCardArticles[cacheContent] = data
                setLoading(false)
                setData(data)
            })
        }
    }, [location])

    return (
        <>
            {loading &&
                <Link to="/">
                    Loading...
        		</Link>
            }
            {!loading && data.length &&
                <div>
                    <div style={CustomStyle.containerHeader}>
                        <Link to={`/`}>
                            <LazyLoadImage
                                alt="Fluidy Logo Go to home"
                                height={500}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbKqoi3Zy7aZSfpiq1z6VO1-hN4Tduw9ZKVA&usqp=CAU"
                                width={500} />
                        </Link>
                        <h1>{category && category.replace(/-/g, " ")}</h1>
                        <h2>{lang}</h2>
                    </div>
                    <div >
                        <ul style={CustomStyle.containerArticles}>
                            {data.map((elem, index) =>
                                <div style={CustomStyle.containerArticle(matches)}>
                                    <Link to={`/article/${lang}/${category}/${elem.id}/${betterUrl(elem.title)}`} key={index - 1}>
                                        <motion.div
                                            animate={{
                                                scale: [0.8, 0.85, 0.90, 0.93, 0.95, 0.97, 0.99, 1, 1, 1, 1, 1, 1],
                                                rotate: [3, -3, 2.5, -2.5, 2, -2, 1.5, -1.5, 1, -1, 0.5, -0.5, 0],
                                            }}
                                            transition={{ duration: 1 }}
                                        >
                                            <CardArticle elem={elem} style={CustomStyle.containerArticleIn}></CardArticle>
                                        </motion.div>
                                    </Link>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}

function betterUrl(url) {
    return (url.replace(/[, !.–%"—:«»\/\\']/g, "-").replace(/--/g, "-").replace(/--/g, "-"))
}

export default ListArticles;
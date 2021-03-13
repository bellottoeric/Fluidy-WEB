import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useApi } from 'react-use-fetch-api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactHtmlParser from 'react-html-parser';
import { GlobalStyles } from './global';
import { CustomStyle } from './css/custom';
import { theme } from './theme';
import { Burger, Menu, Articles } from './components';
import FocusLock from 'react-focus-lock';
import {
	BrowserRouter as Router,
	Switch,
	Link,
	Route,
	Redirect,
	useLocation
} from "react-router-dom";

import globalConfig from "./config.js"

export const useOnClickOutside = (ref, handler) => {
	useEffect(() => {
		const listener = event => {
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}
			handler(event);
		};
		document.addEventListener('mousedown', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
		};
	},
		[ref, handler],
	);
};

function Header() {
	const [open, setOpen] = useState(false);
	const node = useRef();
	const menuId = "main-menu";

	useOnClickOutside(node, () => setOpen(false));

	return (
		<ThemeProvider theme={theme}>
			<>
				<GlobalStyles />
				<div ref={node}>
					<FocusLock disabled={!open}>
						<Burger open={open} setOpen={setOpen} aria-controls={menuId} />
						<Menu open={open} setOpen={setOpen} id={menuId} />
					</FocusLock>
				</div>

			</>
		</ThemeProvider>
	);
}

function App() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/articles/:id">
					<ListArticles />
				</Route>
				<Route path="/article/:id">
					<GetArticle />
				</Route>
				<Route path="*">
					<Redirect to="/" />
				</Route>
			</Switch>
		</Router>
	);
}

function Home() {
	return (
		<div>
			<h1>Hello. This is burger menu tutorial</h1>
			<img src="https://image.flaticon.com/icons/svg/2016/2016012.svg" alt="burger icon" />
			<small>from <Link to="/articles/1">www.flaticon.com</Link></small>
		</div>
	)
}

function ListArticles() {
	const location = useLocation()
	const actualUrl = location.pathname.split('/')
	const { get } = useApi()
	const [data, setData] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (actualUrl.length !== 4) {
			return <Redirect to='/' />
		} else {
			get(globalConfig.host + '/v1/articles?lang=' + actualUrl[2] + '&category=' + actualUrl[3]).then(data => {
				setLoading(false)
				setData(data)
				console.log(data)
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
			{!loading && data.length &&
				<div style={CustomStyle.containerData}>
					<div style={CustomStyle.containerHeader}>
						<Link to={`/`} key={999}>
							<LazyLoadImage
								alt="Fluidy Logo Go to home"
								height={500}
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbKqoi3Zy7aZSfpiq1z6VO1-hN4Tduw9ZKVA&usqp=CAU"
								width={500} />
						</Link>
						<h1>{actualUrl[3].replace(/-/g, " ")}</h1>
						<h2>{actualUrl[2]}</h2>
					</div>
					<div >
						<ul style={CustomStyle.containerArticles}>
							{data.map((elem, index) =>
								<div style={CustomStyle.containerArticle}>
									<Link to={`/article/${actualUrl[2]}/${actualUrl[3]}/${elem.id}/${betterUrl(elem.title)}`} key={index}>
										<Articles elem={elem}></Articles>
									</Link>
									<br></br>
								</div>)}
						</ul>
					</div>
				</div>
			}
		</>
	)
}

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
					<p>{data.title}</p>
					<p>Author {data.author}</p>
					<p>Date {data.pubDate}</p>
					<p>Source {data.source}</p>
					<p>Go to source{data.link}</p>
					<img alt={data.title} src={data.img}></img>
					<div> {ReactHtmlParser(data.content)} </div>
				</>
			}
		</>
	)
}

function betterUrl(url) {
	return (url.replace(/[, !.–]/g, "-").replace(/--/g, "-").replace(/--/g, "-"))
}

export default App;
import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu, ListArticles, GetArticle, DivGlobalCSS } from './components';
import FocusLock from 'react-focus-lock';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import useMouse from '@react-hook/mouse-position'
import {
	BrowserRouter as Router,
	Link,
	Redirect,
} from "react-router-dom";

var saveX = 0

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

function Header(mouse) {
	const [open, setOpen] = useState(false);
	const node = useRef();
	const menuId = "main-menu";

	useOnClickOutside(node, () => setOpen(false));

	if (!open && mouse.mouse.x && mouse.mouse.x < 200 && saveX > 200 && saveX !== 0) {
		//setOpen(true)
	} else if (open && mouse.mouse.x && mouse.mouse.x > 400 && saveX < 400 && saveX !== 0) {
		//setOpen(false)
	} else {
		saveX = mouse.mouse.x
	}

	return (
		<ThemeProvider theme={theme}>
			<>
				<GlobalStyles />
				<div name="HeaderContainer" ref={node}>
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
	const ref = React.useRef(null)
	const mouse = useMouse(ref, {
		enterDelay: 100,
		leaveDelay: 100,
	})


	return (
		<DivGlobalCSS ref={ref}>
			<Router>
				<Header mouse={mouse} />
				<CacheSwitch>
					<CacheRoute exact path="/">
						<Home />
					</CacheRoute>
					<CacheRoute exact path="/articles/:lang/:category/" component={ListArticles} cacheKey="MyComponent" />
					<CacheRoute exact path="/article/:lang/:category/:id/:name" component={GetArticle} />
					<CacheRoute path="*">
						<Redirect to="/" />
					</CacheRoute>
				</CacheSwitch>
			</Router>
		</DivGlobalCSS>
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





export default App;
import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from './hooks';
import { useApi } from 'react-use-fetch-api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactHtmlParser from 'react-html-parser'; 
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu } from './components';
import FocusLock from 'react-focus-lock';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";

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
  const location2 = location.pathname.split('/')
  const { get } = useApi()
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (location2.length !== 4) {
        return <Redirect to='/' />
      } else {
        get('https://api.fluidy.news/v1/articles?lang=' + location2[2] + '&category=' + location2[3]).then(data => {
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
        {!loading && data &&
          <><ul>
            {data.map((elem, index) => <>
              <Link to={`/article/${location2[2]}/${location2[3]}/${elem.id}`} key={index}>
                <span aria-hidden="true">💁🏻‍♂️</span>
                <p>{elem.title}</p>
                <p>Author {elem.author}</p>
                <p>Date {elem.pubDate}</p>
                <LazyLoadImage
                  alt={elem.title}
                  height={500}
                  src={elem.img} 
                  width={500} />
              </Link>
              <br></br>
            </>)}
          </ul></>
        }
    </>
  )
}

function GetArticle() {
  const location = useLocation()
  const location2 = location.pathname.split('/')
  const { get } = useApi()
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (location2.length !== 5) {
      return <Redirect to='/' />
    } else {
      get('https://api.fluidy.news/v1/article?lang=' + location2[2] + '&category=' + location2[3] + '&id=' + location2[4]).then(data => {
        console.log(data)

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
          <div> {ReactHtmlParser( data.content )} </div>
        </>
      }
    </>
  )
}

export default App;
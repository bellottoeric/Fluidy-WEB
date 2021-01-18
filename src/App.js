import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from './hooks';
import { useApi } from 'react-use-fetch-api';
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
  const [ok, setOk] = useState(true)

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/articles/:id">
          <ListArticles ok={ok}/>
        </Route>
        <Route path="/article/:id">
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

function ListArticles({ok, setOk}) {
  let location = useLocation().pathname.split('/')
  const { get } = useApi()
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    console.log("--->", ok)

    console.log(location.length, data)
    if (location.length !== 4) {
      return <Redirect to='/' />
    } else {
      get('https://api.fluidy.news/v1/articles?lang=' + location[2] + '&category=' + location[3]).then(data => {
        setLoading(false)
        setData(data)
        console.log(data)
      })
    }
  }, [])

  return (
    <>
        {loading && <Link>
          <span aria-hidden="true">💁🏻‍♂️</span>
              LOADING CATEGORIES
            </Link>
        }
        {!loading && data &&
          <><ul>
            {data.map((elem, index) => <>
              <Link>
                <span aria-hidden="true">💁🏻‍♂️</span>
                {elem.title}
              </Link>
              <br></br>
              
              <br></br>
            </>)}
          </ul></>
        }
    </>
  )
}

export default App;
import React, { useState, useEffect } from 'react';
import { bool } from 'prop-types';
import { useApi } from 'react-use-fetch-api';
import { Link } from "react-router-dom";
import globalConfig from "../config.js"
import styled from 'styled-components';

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.primaryLight};
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  overflow-y: scroll;
  height: 100%;
  "overflow-y": "scroll", "height": "100%", "position": "fixed";
  position: fixed;
  width: 16%; 

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  a {
    font-size: 10px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.12rem;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;

const Menu = ({ open, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  const { get } = useApi()
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    get(globalConfig.host + '/v1/categories').then(data => {
      setLoading(false)
      setData(data)
    })
  }, [])

  return (
    <>
      <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
        {loading &&
          <Link to="/" tabIndex={tabIndex}>
            CANCEL LOADING CATEGORIES
          </Link>
        }
        {!loading && data &&
          <><ul style={{
            marginTop: "30%",
            top: 0,
            position: "fixed"
          }}>
            {data.map((elem, index) => <>
              <br></br>
              {elem.categories.map((category, index2) => <>
                <Link to={`/articles/${elem.lang}/${category}`} tabIndex={index2}>
                  {category.replace(/-/g, " ")}
                </Link>
                <br></br>
              </>)}
              <br></br>
              <br></br>
            </>)}
          </ul></>
        }
      </StyledMenu>
    </>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;

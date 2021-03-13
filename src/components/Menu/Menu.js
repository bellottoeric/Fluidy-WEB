import React, { useState, useEffect } from 'react';
import { bool } from 'prop-types';
import { useApi } from 'react-use-fetch-api';
import { StyledMenu } from './Menu.styled';
import { Link } from "react-router-dom";
import globalConfig from "../../config.js"


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
          <><ul style={{ marginTop: "30%" }}>
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

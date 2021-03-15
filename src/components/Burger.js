import React from 'react';
import { bool, func } from 'prop-types';
import styled from 'styled-components';

const StyledBurger = styled.button`
  position: fixed;
  top: 5%;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  transform: ${({ open }) => open ? 'translateX(230px)' : 'rotate(0)'};
  -webkit-transition: 1s ease-in-out;
  -moz-transition: 1s ease-in-out;
  -o-transition: 1s ease-in-out;
  transition: 1s ease-in-out;

  span {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme, open }) => open ? theme.primaryDark : theme.primaryLight};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const StyledTitle = styled.p`
  position: fixed;
  top: 6.7%;
  color: black;
  left: -12.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 14rem;
  height: 2rem;
  background: transparent;
  border: none;
  padding: 0;
  z-index: 10;
  transform: ${({ open }) => open ? 'translateX(230px)' : 'rotate(0)'};
  -webkit-transition: 1s ease-in-out;
  -moz-transition: 1s ease-in-out;
  -o-transition: 1s ease-in-out;
  transition: 1s ease-in-out;
  display: ${({ open }) => open ? 'block' : 'none'};
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.12rem;
  color: #0D0C1D;
  text-decoration: none;
  transition: color 0.3s linear;
`;
const Burger = ({ open, setOpen, ...props }) => {
  const isExpanded = open ? true : false;


  return (
    <div>
      <StyledTitle open={open}>
        Select a category
        <span />
      </StyledTitle>
      <StyledBurger aria-label="Toggle menu" aria-expanded={isExpanded} open={open} onClick={() => {
        setOpen(!open)
      }} {...props}>
        <span />
        <span />
        <span />
      </StyledBurger>
    </div>
  )
}

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default Burger;

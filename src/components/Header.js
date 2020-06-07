import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  font-weight: bolder;
  font-size: 12px;
  color: #105fa6;
  text-shadow: 2px 2px 4px rgba(150, 150, 150, 1);
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <h6> ◣MOVIE COLLECTOR◥</h6>
      <span> Create and organize your movie list </span>
    </HeaderWrapper>
  );
};

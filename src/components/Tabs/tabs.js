import styled from "styled-components"

export const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  font-family: Open Sans;
  height: auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3px;
`

export const Tab = styled.button`
  box-sizing: border-box;
  border: none;
  outline: none;
  cursor: pointer;
  width: 100%;
  position: relative;
  font-size: 1em;
  border: ${(props) => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${(props) => (props.active ? "none" : "")};
  background-color: ${(props) => (props.active ? "#bbe1fa" : "lightgray")};
  height: ${(props) => (props.active ? "3em" : "2.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: #d3d3d38a;
  }
`
export const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`

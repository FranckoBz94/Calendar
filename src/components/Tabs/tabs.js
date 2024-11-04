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
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`

export const TabsModal = styled.div`
  overflow: hidden;
  background: #fff;
  font-family: Open Sans;
  height: auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
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
  background-color: ${(props) => (props.active ? "#6a1b9a" : "#ce93d8")};
  height: ${(props) => (props.active ? "auto" : "2.6em; top:.4em;height:100%")};
  transition: background-color 0.5s ease-in-out;
  color: #fff;
  border-radius: ${(props) => (props.active ? "5px" : "opx")};

  :hover {
    background-color: #ba68c8;
  }
`
export const TabModal = styled.button`
  box-sizing: border-box;
  border: none;
  outline: none;
  cursor: pointer;
  width: 100%;
  position: relative;
  font-size: 1em;
  border: ${(props) => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${(props) => (props.active ? "none" : "")};
  background-color: ${(props) =>
    props.active ? "rgb(11 14 58 / 74%)" : "rgb(131 131 131)"};
  height: ${(props) => (props.active ? "auto" : "2.6em; top:.4em;height:100%")};
  transition: background-color 0.5s ease-in-out;
  color: #fff;
  border-radius: ${(props) => (props.active ? "5px" : "opx")};

  :hover {
    background-color: rgb(11 14 58 / 90%);
  }
`

export const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`

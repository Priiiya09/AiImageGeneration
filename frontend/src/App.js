
import { darkTheme } from "./utils/Theme";
import styled ,{ThemeProvider} from "styled-components";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  const Container=styled.div`
  width:100%;
  height:100%;
  display:flex;
  background:${({theme})=>theme.bg};
  color:${({theme})=>theme.text_primary};
  overflow-x:hidden;
  overflow-y:hidden;
  transition:all 0.2s ease;  
  `
  const Wrapper=styled.div`
  position:relative;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content=space-between;
  flex:3;

  `
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Wrapper>
          <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} exact/>
            <Route path="/post" element={<CreatePost/>} exact/>
          </Routes>
       
        </BrowserRouter>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;

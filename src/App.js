import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Note from "./scenes/note";
import Twitter from "./scenes/twitter";
import Calculator from "./scenes/calculator/Calculator";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 769) {
        setIsMobile(true);
        setIsSidebar(false);
      } else {
        setIsMobile(false);
        setIsSidebar(true);
      }
    };

    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isMobile && <Sidebar />}
          <main className="content">
            {isMobile && <Topbar />}
            <Routes>
              <Route path="/note" element={<Note />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/twitter" element={<Twitter />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// export const MobileContext = createContext({
//   isMobile: false,
//   setIsMobile: () => {},
// });

export default App;

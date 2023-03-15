import { Box, IconButton, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext,  } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CalculateIcon from '@mui/icons-material/Calculate';
import TwitterIcon from '@mui/icons-material/Twitter';

const Topbar = ({}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();

  const handleTwitterIconClick = () => {
    navigate("/twitter");
    
  };
  const handleNoteIconClick = () => {
    navigate("/note");
    
  };
  const handleCalculatorIconClick = () => {
    navigate("/calculator");
    
  };

  return (
    <Box display="flex" justifyContent="space-between" px={1}>
      
      

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton onClick={handleTwitterIconClick} >
          <TwitterIcon />
        </IconButton>
        <IconButton  onClick={handleNoteIconClick} >
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton  onClick={handleCalculatorIconClick}>
          <CalculateIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;

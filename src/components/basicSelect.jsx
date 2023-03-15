import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BasicSelect = ({ values,  onChange, selectedValue }) => {
  const [userTweets, setUsersTweets] = React.useState('');

  const handleChange = (event) => {
    // setUsersTweets(event.target.value);
    onChange(event);
    // console.log(userTweets);
  };

  const items = values.map(e => (
    <MenuItem value={e} key={e}>{e}</MenuItem>
  ));



  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">User</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={selectedValue}
          onChange={handleChange}
          label="selectUserTweets"
        >
          {items}


        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
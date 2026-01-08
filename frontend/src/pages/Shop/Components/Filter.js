import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import { Slider } from '@mui/material';
import { useState } from 'react';

export default function Filter({onAddCategory,categoriesMap}) {

  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper sx={{ width: 320 }} style={{height:"fit-content"}}>
      <MenuList dense>
        <MenuItem>
          <ListItemText>Uwzględnij kategorie:</ListItemText>
        </MenuItem>
        <Divider />
        {Object.keys(categoriesMap).map(label => (
          <MenuItem onClick={()=>{onAddCategory(label)}}>
          < ListItemText inset>{label}</ListItemText>
          </MenuItem>
        ))}
        

        <Divider />
        <MenuItem>
          <ListItemText>Zakres cenowy:</ListItemText>
        </MenuItem>
        <MenuItem>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
          />
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
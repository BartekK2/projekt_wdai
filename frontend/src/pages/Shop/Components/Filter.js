import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import { Slider } from '@mui/material';
import { useState } from 'react';

export default function Filter({onAddCategory,categoriesMap,changePrice,priceRange}) {

  const [value, setValue] = useState([0, 2000]);
  const marks = [
    {
      value: 0,
      label: '0zł',
    },
    {
      value: 2000,
      label: '2000zł',
    },
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const setPriceToRequest = (event,newValue)=>{ /* żeby nie wysyłać tysięcy zapytań do serwera xd */
    changePrice(newValue);
  }
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
            marks={marks}
            min={0}
            max={2000}
            onChangeCommitted={setPriceToRequest}
          />
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
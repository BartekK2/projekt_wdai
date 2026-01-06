import Chip from '@mui/material/Chip';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DiamondIcon from '@mui/icons-material/Diamond';
import IceSkatingIcon from '@mui/icons-material/IceSkating';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import Stack from '@mui/material/Stack';

function Category() {
  
  return (
    /*wersja desktopowa*/
    <Stack direction="row" spacing={2} >
      <Chip color="secondary" label="Buty" onDelete={()=>{}} icon={<IceSkatingIcon />} />
      <Chip color="secondary" label="Dla dzieci" onDelete={()=>{}} icon={<ChildFriendlyIcon />} />
      <Chip color="secondary" label="Odzież" onDelete={()=>{}} icon={<CheckroomIcon />} />
      <Chip color="secondary" label="Biżuteria" onDelete={()=>{}} icon={<DiamondIcon />} />
      <Chip color="secondary" label="Kosmetyki" onDelete={()=>{}} icon={<CleanHandsIcon />} />
    </Stack>
    /*wersja mobilna*/
  );
}

export default Category;

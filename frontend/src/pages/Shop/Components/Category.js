import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';




function Category({onCategoryDelete,chosenCategories,categoriesMap}) {
  useEffect(() => {
    console.log(Array.isArray(chosenCategories));
  }, [])
  
  return (
    /*wersja desktopowa*/
    <Stack direction="row" spacing={2} >
    {Object.entries(categoriesMap)
        .filter(([label,x]) => chosenCategories.includes(label)) 
        .map(([label, IconComponent]) => (
          <Chip 
            key={label} 
            color="secondary" 
            label={label} 
            onDelete={() => onCategoryDelete(label)} 
            icon={<IconComponent />} 
          />
        ))}
    </Stack>
    /*wersja mobilna*/
  );
}

export default Category;

import React, {memo, useCallback} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import plants  from '../../database/plants.json';
import { ListPlants } from './ListPlants';
import {colors} from '../../theme';

export const Shop: React.FC = memo(() => {

  const renderPlants = useCallback(
    () =>
    plants.map(plant => (
      <ListPlants key={plant.id} plant={plant} />
    )),
    [plants]
  );

  return (
    <>
      <Box
        flex="auto"
        display="flex" 
        alignItems="center"
        justifyContent="center"
        padding={4}
      >
        <p style={{
          fontFamily: 'Arial',
          fontSize: 20,
          color: colors.primary,
        }}>
          Plant Garden Shop
        </p>
      </Box>
      <Grid container spacing={4}>
        {renderPlants()}
      </Grid>
    </>
  );
});

import React, { memo } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { colors } from '../../theme';

export type PlantsProps = {
  id: number;
  name: string;
  picture: string;
  description: string;
  buyerPlant: string;
};

export type ListPlantsProps = {
  plant: PlantsProps;
};

export const ListPlants: React.FC<ListPlantsProps> = memo(({ plant }) => {
  return (
    <Grid item xs={12} sm={4}>
      <Card style={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          image={require(`../../database/${plant.picture}`).default}
          title={plant.name}
          height="200"
        />
        <CardContent>
          <Typography variant="h6" style={{ color: colors.primary }}>
            {plant.name}
          </Typography>
          <Typography style={{ color: colors.text }}>
            {plant.description}
          </Typography>
        </CardContent>
        <CardActions>
          {plant.buyerPlant === '0x0000000000000000000000000000000000000000' ? (
            <Button size="large">BUY</Button>
          ) : (
            <Typography style={{ color: colors.error, padding: 10 }}>
              {plant.buyerPlant}
            </Typography>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
});

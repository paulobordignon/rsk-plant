import React, {memo} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import {colors} from '../../theme';

export type ListPlantsProps = {
  plant: PlantsProps;
};

export type PlantsProps = {
  id: number;
  name: string;
  picture: string;
  description: string;
}

export const ListPlants: React.FC<ListPlantsProps> = memo(
  ({ plant }) => {
  return (
    <Grid item xs={12} sm={4}>
      <Card style={{maxWidth: 345}}>
        <CardMedia
          component="img"
           image={require(`../../database/${plant.picture}`).default} 
          title={plant.name}
          height="200"
        />
        <CardContent>
          <Typography variant="h6" style={{color: colors.primary }}>{plant.name}</Typography>
          <Typography style={{color: colors.text}}>{plant.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="large">BUY</Button>
        </CardActions>
     </Card>
    </Grid>
  );
});

import React, { memo, useCallback } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { colors } from '../../theme';
import { ListPlantsProps } from './types';

export const ListPlants: React.FC<ListPlantsProps> = memo(
  ({ plant, contract, account, setShowAlert, setMessageType }) => {
    const buyPlant = useCallback(
      id => {
        if (!account) {
          setShowAlert(true);
          setMessageType(0);
        } else {
          contract.methods
            .buy(id)
            .send({ from: account })
            .then(function (tx) {
              console.log('transaction', tx);
            });
        }
      },
      [contract.methods]
    );

    return (
      <Grid item xs={12} sm={4}>
        <Card style={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            image={
              plant.picture
                ? require(`../../database/${plant.picture}`).default
                : ''
            }
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
            {plant.buyerPlant ===
            '0x0000000000000000000000000000000000000000' ? (
              <Button
                size="large"
                onClick={() => {
                  buyPlant(plant.id);
                }}
              >
                BUY
              </Button>
            ) : (
              <Typography style={{ color: colors.error, padding: 10 }}>
                {plant.buyerPlant}
              </Typography>
            )}
          </CardActions>
        </Card>
      </Grid>
    );
  }
);

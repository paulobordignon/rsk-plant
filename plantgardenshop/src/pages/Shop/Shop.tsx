import React, {memo, useCallback} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import plants  from '../../database/plants.json';
import { ListPlants } from './ListPlants';
import {colors} from '../../theme';
import Web3 from "web3";
import Web3Modal from "web3modal";

export const Shop: React.FC = memo(() => {

  const renderPlants = useCallback(
    () =>
    plants.map(plant => (
      <ListPlants key={plant.id} plant={plant} />
    )),
    [plants]
  );

  const Web3 = require("web3");

  const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      console.log(Web3.eth.getAccounts());
      return true;
    }
    return false;
  }

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
        <Button onClick={ethEnabled}>
          teste
        </Button>
      </Box>
      <Grid container spacing={4}>
        {renderPlants()}
      </Grid>
    </>
  );
});

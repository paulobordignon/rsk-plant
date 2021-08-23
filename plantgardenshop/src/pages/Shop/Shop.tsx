import React, { memo, useCallback, useEffect, useState } from 'react';

import Web3 from 'web3';
import Web3Modal from 'web3modal';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import plants from '../../database/plants.json';
import { colors } from '../../theme';
import { ListPlants } from './ListPlants';

export const Shop: React.FC = memo(() => {
  const Web3 = require('web3');

  const web3 = new Web3(window.web3.currentProvider);

  const accounts = web3.eth.getAccounts();

  const contractAdress = '0xB2f1A805F00fd9BCF7C7dE8a29C08fE3081595d0';

  const abi = JSON.parse(
    '[{"constant": true, "inputs": [{"name": "","type": "uint256"}],"name": "buyers","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "plantId","type": "uint256"}],"name": "buy","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "getBuyers","outputs": [{"name": "","type": "address[16]"}],"payable": false,"stateMutability": "view","type": "function"}]'
  );

  const contract = new web3.eth.Contract(abi, contractAdress);

  const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      return true;
    }
    return false;
  };

  const [plantsWithBuyers, setPlantsWithBuyers] = useState([plants]) as any;

  useEffect(() => {
    let i = 0;
    const itensCopy = plants as any;
    contract.methods
      .getBuyers()
      .call()
      .then(async function (buyers: any) {
        await buyers.map((buyer: any) => {
          const descriptor = Object.create(null);
          descriptor.value = buyer;
          Object.defineProperty(itensCopy[i], 'buyerPlant', descriptor);
          i++;
          return true;
        });
        setPlantsWithBuyers(itensCopy);
      })
      .catch(function (err: any) {
        console.log('error:', err);
      });
  }, []);

  const renderPlants = useCallback(
    a => a.map((plant: any) => <ListPlants key={plant.id} plant={plant} />),
    []
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
        <p style={{ fontFamily: 'Arial', fontSize: 20, color: colors.primary }}>
          Plant Garden Shop
        </p>
        <Button onClick={ethEnabled}> Login </Button>
      </Box>
      <Grid container spacing={4}>
        {renderPlants(plantsWithBuyers)}
      </Grid>
    </>
  );
});

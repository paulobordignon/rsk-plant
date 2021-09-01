import React, { memo, useCallback, useEffect, useState } from 'react';

import { PGAlert, PGHeader } from 'components';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import plants from '../../database/plants.json';
import { ListPlants } from './ListPlants';

export const Shop: React.FC = memo(() => {
  const Web3 = require('web3');

  const web3 = new Web3(window.web3.currentProvider);

  const [account, setAccount] = useState('');

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  const abi = JSON.parse(
    '[{"constant": true, "inputs": [{"name": "","type": "uint256"}],"name": "buyers","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "plantId","type": "uint256"}],"name": "buy","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "getBuyers","outputs": [{"name": "","type": "address[16]"}],"payable": false,"stateMutability": "view","type": "function"}]'
  );

  const contract = new web3.eth.Contract(abi, contractAddress);

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
    web3.eth.getAccounts(async function (err, accounts) {
      if (err != null) {
        console.log(err);
      }
      if (accounts?.length > 0) {
        await setAccount(accounts[0]);
      }
    });
  }, []);

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
    a =>
      a.map((plant: any) => (
        <ListPlants
          key={plant.id}
          plant={plant}
          contract={contract}
          account={account}
          setShowAlert={setShowAlert}
        />
      )),
    [account]
  );

  const [showAlert, setShowAlert] = useState<boolean>(false);

  return (
    <>
      <PGHeader
        title="Plant Garden Shope"
        loginOnClick={ethEnabled}
        loginActive={account}
      />
      <Box paddingBottom={8}>
        <Typography> Execuntado: {contractAddress} </Typography>
        <Box>
          <TextField label="Informe o smart Contract" />
        </Box>
      </Box>
      <Grid container spacing={4}>
        {renderPlants(plantsWithBuyers)}
      </Grid>
      <PGAlert showAlert={showAlert} setShowAlert={setShowAlert} />
    </>
  );
});

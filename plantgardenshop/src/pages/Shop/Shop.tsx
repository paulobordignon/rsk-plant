import React, { memo, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { PGAlert, PGHeader } from 'components';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import plants from '../../database/plants.json';
import { ListPlants } from './ListPlants';

export const Shop: React.FC = memo(() => {
  const Web3 = require('web3');

  const web3 = new Web3(window.web3.currentProvider);

  const [account, setAccount] = useState('');

  const [contractAddress, setContractAddress] = useState(
    process.env.REACT_APP_CONTRACT_ADDRESS
  );

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
    /* setPlantsWithBuyers('1'); */
    const itensCopy = plants as any;
    console.log(contract.methods.getBuyers().call().then());
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
    console.log(plantsWithBuyers);
  }, [contractAddress]);

  const renderPlants = useCallback(
    a =>
      a.map((plant: any) => (
        <ListPlants
          key={plant.id}
          plant={plant}
          contract={contract}
          account={account}
          setShowAlert={setShowAlert}
          setMessageType={setMessageType}
        />
      )),
    [account, plantsWithBuyers]
  );

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [messageType, setMessageType] = useState() as any;

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    if (web3.utils.isAddress(data.contractAddress) === true) {
      setContractAddress(data.contractAddress);
    } else {
      setShowAlert(true);
      setMessageType(1);
    }
  };

  return (
    <>
      <PGHeader
        title="Plant Garden Shop"
        loginOnClick={ethEnabled}
        loginActive={account}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box paddingBottom={8}>
          <Typography> Execuntado: {contractAddress} </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Informe o smart Contract"
                {...register('contractAddress')}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Box py={2}>
                <Button variant="contained" color="primary" type="submit">
                  Consultar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
      <Grid container spacing={4}>
        {renderPlants(plantsWithBuyers)}
      </Grid>
      <PGAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        messageType={messageType}
      />
    </>
  );
});

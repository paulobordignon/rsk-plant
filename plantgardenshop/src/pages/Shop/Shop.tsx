import React, { memo, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import WalletConnectProvider from '@walletconnect/web3-provider';
import { PGAlert, PGHeader } from 'components';
import { i18n } from 'translate/i18n';
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
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: '27e484dcd9e3efcfd25a83a78777cdf1',
        chainId: 31,
        rpc: {
          31: 'https://public-node.testnet.rsk.co',
        },
      },
    },
  };

  const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions,
    theme: 'dark',
  });

  const provider = window.web3.currentProvider;

  const handleLogin = async () => {
    await web3Modal
      .connect()
      .then(res => {
        if (res?.accounts?.length > 0) {
          setAccount(res.accounts[0]);
        } else {
          web3.eth.getAccounts().then(res => {
            if (res?.length > 0) {
              setAccount(res[0]);
            }
          });
        }
        return true;
      })
      .catch(() => {
        console.log('erro');
        return false;
      });
    return true;
  };

  const web3 = new Web3(provider);

  const [account, setAccount] = useState('');

  const [contractAddress, setContractAddress] = useState(
    process.env.REACT_APP_CONTRACT_ADDRESS
  );

  const abi = JSON.parse(
    '[{"constant": true, "inputs": [{"name": "","type": "uint256"}],"name": "buyers","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "plantId","type": "uint256"}],"name": "buy","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "getBuyers","outputs": [{"name": "","type": "address[16]"}],"payable": false,"stateMutability": "view","type": "function"}]'
  );

  const contract = new web3.eth.Contract(abi, contractAddress);

  const [plantsWithBuyers, setPlantsWithBuyers] = useState([plants]) as any;
  const [loadingNewPlants, setLoadingNewPlants] = useState<boolean>(false);

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
        setLoadingNewPlants(true);
        await buyers.map((buyer: any) => {
          Object.defineProperty(itensCopy[i], 'buyerPlant', {
            value: buyer,
            configurable: true,
          });
          i++;
          return true;
        });
        await setPlantsWithBuyers(itensCopy);
        setLoadingNewPlants(false);
      })
      .catch(function (err: any) {
        console.log('error:', err);
      });
  }, [contractAddress]);

  const renderPlants = useCallback(
    contract =>
      plantsWithBuyers.map((plant: any) => (
        <ListPlants
          key={plant.id}
          plant={plant}
          contract={contract}
          account={account}
          setShowAlert={setShowAlert}
          setMessageType={setMessageType}
        />
      )),
    [account, plantsWithBuyers, loadingNewPlants]
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
        loginOnClick={handleLogin}
        loginActive={account}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box paddingBottom={8}>
          <Typography>
            {i18n.t('texts.running')}: {contractAddress}
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <TextField
                label={i18n.t('texts.information')}
                {...register('contractAddress')}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Box py={2}>
                <Button variant="contained" color="primary" type="submit">
                  {i18n.t('buttons.consult')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
      <Grid container spacing={4}>
        {renderPlants(contract)}
      </Grid>
      <PGAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        messageType={messageType}
      />
    </>
  );
});

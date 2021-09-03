import React, { memo } from 'react';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

import Alert from '@material-ui/lab/Alert';

enum messageType {
  WALLET_ERROR,
  CONTRACT_ERROR,
}

export const PGAlert: React.FC<{
  showAlert: boolean;
  setShowAlert: (boolean) => void;
  messageType: messageType;
}> = memo(({ showAlert, setShowAlert, messageType }) => (
  <div
    style={{
      width: '80%',
      bottom: 30,
      position: 'fixed',
      zIndex: 1,
      verticalAlign: 'center',
      left: '10%',
    }}
  >
    <Collapse in={showAlert}>
      <Alert
        severity="error"
        action={
          <Button
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setShowAlert(false);
            }}
          >
            Fechar
          </Button>
        }
      >
        {messageType === 0
          ? 'Você não está conectado a carteira.'
          : 'O endereço digitado é inválido'}
      </Alert>
    </Collapse>
  </div>
));

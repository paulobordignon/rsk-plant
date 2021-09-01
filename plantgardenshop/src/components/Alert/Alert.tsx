import React, { memo } from 'react';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

import Alert from '@material-ui/lab/Alert';

export const PGAlert: React.FC<{
  showAlert: boolean;
  setShowAlert: (boolean) => void;
}> = memo(({ showAlert, setShowAlert }) => (
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
        Você não está conectado a carteira.
      </Alert>
    </Collapse>
  </div>
));

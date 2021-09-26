import React, { memo, useCallback, useState } from 'react';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export const MultiLanguage: React.FC = memo(() => {
  const I18N_STORAGE_KEY = 'i18nextLng';
  const [language] = useState(localStorage.getItem(I18N_STORAGE_KEY));

  const handleLanguage = useCallback(event => {
    if (event.target.value !== undefined) {
      localStorage.setItem(I18N_STORAGE_KEY, event.target.value);
      window.location.reload();
    }
  }, []);

  return (
    <ToggleButtonGroup value={language} exclusive onChange={handleLanguage}>
      <ToggleButton value="en-US">en</ToggleButton>
      <ToggleButton value="es-ES">es</ToggleButton>
      <ToggleButton value="pt-BR">pt</ToggleButton>
    </ToggleButtonGroup>
  );
});

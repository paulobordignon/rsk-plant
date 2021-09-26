import React, { memo } from 'react';

import { colors } from 'theme';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { MultiLanguage } from '../MultiLanguage';
import { PGHeaderPros } from './types';

export const PGHeader: React.FC<PGHeaderPros> = memo(
  ({ title, loginOnClick, loginActive }) => (
    <Box
      flex="auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={4}
    >
      <p style={{ fontFamily: 'Arial', fontSize: 20, color: colors.primary }}>
        {title}
      </p>
      {!loginActive && <Button onClick={loginOnClick}> Login </Button>}
      <MultiLanguage />
    </Box>
  )
);

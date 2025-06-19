import { Box,  Avatar } from '@mui/material';
import { SystemStyleObject, Theme } from '@mui/system';

import { Card, InlineTextInput } from '@components/atoms';
import { IContact } from 'react-coding-interview-shared/models';
import { useState } from 'react';

export interface IContactCardProps {
  person: IContact;
  sx?: SystemStyleObject<Theme>;
}

export const ContactCard: React.FC<IContactCardProps> = ({
  person: { name, email },
  sx,
}) => {
  const [nameInput,setNameInput] = useState(name)
   const [emailInput,setEmailInput] = useState(email)
  return (
    <Card sx={sx}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar />
        <Box textAlign="center" mt={2}>
          <InlineTextInput
            label='Name'
            value={nameInput}
            type='text'
            onSave={(newName) => setNameInput(newName)}
            />
          <InlineTextInput
            label='Email'
            value={emailInput}
            type='email'
            onSave={(newEmail) => setEmailInput(newEmail)}
            />

        </Box>
      </Box>
    </Card>
  );
};

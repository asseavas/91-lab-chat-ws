import React, { useState } from 'react';
import { Grid2, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';

interface Props {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

const ChatForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [state, setState] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.trim()) {
      setError('Message cannot be empty or just whitespace.');
      return;
    }

    setError(null);
    onSubmit(state);
    setState('');
  };

  return (
    <Grid2 container spacing={3} component="form" alignItems="center" onSubmit={submitFormHandler}>
      <Grid2 size={10}>
        <TextField
          required
          label="Enter message"
          id="text"
          name="text"
          value={state}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setState(event.target.value)}
          error={!!error}
          helperText={error}
        />
      </Grid2>
      <Grid2 size={2}>
        <LoadingButton
          sx={{
            width: '100%',
            height: '55px',
            backgroundColor: error ? 'red' : 'primary.main',
            '&:hover': {
              backgroundColor: error ? 'darkred' : 'primary.dark',
            },
          }}
          type="submit"
          loading={isLoading}
          endIcon={<SendIcon />}
          variant="contained"
        >
          Send
        </LoadingButton>
      </Grid2>
    </Grid2>
  );
};

export default ChatForm;

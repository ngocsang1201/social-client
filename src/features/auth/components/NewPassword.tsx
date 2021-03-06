import { Box, Container, Typography } from '@mui/material';
import { authApi } from 'api';
import { PageTitle } from 'components/common';
import ChangePasswordForm from 'features/settings/components/ChangePasswordForm';
import { IChangePasswordFormValues, IField } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { themeMixins } from 'utils/theme';

export interface INewPasswordProps {
  token: string;
  mode: 'createPassword' | 'resetPassword';
}

export function NewPassword({ token, mode }: INewPasswordProps) {
  if (!token) return null;

  const navigate = useNavigate();

  const { t } = useTranslation('auth');

  const defaultValues: IChangePasswordFormValues = {
    token,
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = async (formValues: IChangePasswordFormValues) => {
    await authApi.resetPassword(formValues);
    navigate('/login', { replace: true });
  };

  const fieldList: IField[] = [
    {
      name: 'newPassword',
      props: {},
    },
    {
      name: 'confirmPassword',
      props: {},
    },
  ];

  return (
    <>
      <PageTitle title={t(`pageTitle.${mode}`)} />

      <Container maxWidth="sm">
        <Box mt={3} p={3} sx={{ ...themeMixins.paperBorder() }}>
          <Typography fontSize={24} fontWeight={500} mb={2}>
            {t(`pageTitle.${mode}`)}
          </Typography>

          <ChangePasswordForm
            fieldList={fieldList}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            submitButtonLabel={t(`btnLabel.${mode}`)}
          />
        </Box>
      </Container>
    </>
  );
}

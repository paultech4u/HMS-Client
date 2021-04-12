/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, clearErrorAction } from './AuthStoreSlice';
import {
  Box,
  Link,
  Backdrop,
  Typography,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import {
  AuthCard,
  AuthButton,
  AuthTextInput,
  AuthPasswordInput,
} from './AuthCommon';
import { MdArrowForward } from 'react-icons/md';
import { NotifitionAlert } from '../common/Alert';
import { useIsDesktop } from '../hooks';

const FormKeys = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

function AuthLogin(props) {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isDesktop = useIsDesktop();

  const formik = useFormik({
    initialValues: {
      [FormKeys.EMAIL]: '',
      [FormKeys.PASSWORD]: '',
    },
    onSubmit: (values) => {
      const payload = {
        ...values,
      };

      dispatch(loginAction(payload));
    },
  });

  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const closeError = () => {
    dispatch(clearErrorAction());
  };

  const handleEmailRequest = () => {
    history.push('/reset');
  };

  return (
    <Box>
      <AuthCard
        elevation={6}
        marginTop={30}
        paperclassname={styles.authCard_paper}>
        <Box
          marginX={10}
          padding={15}
          borderRadius={6}
          marginTop='-20px'
          bgcolor='primary.main'
          className={styles.authCard_header}>
          <Typography variant='h6' className={styles.authCard_header_title}>
            LOGIN
          </Typography>
        </Box>
        <Box
          padding={10}
          display='flex'
          alignItems='center'
          flexDirection='column'>
          <Box className={styles.textField}>
            <Typography variant='caption'>Email</Typography>
            <AuthTextInput
              name='email'
              variant='outlined'
              onBlur={formik.handleBlur}
              onInput={formik.handleChange}
              value={formik.values[FormKeys.EMAIL]}
              placeholder='JohnDoe@gmail.com'
            />
          </Box>
          <Box marginTop={10} className={styles.textField}>
            <Typography variant='caption'>Password</Typography>
            <AuthPasswordInput
              variant='outlined'
              onBlur={formik.handleBlur}
              onInput={formik.handleChange}
              value={formik.values[FormKeys.PASSWORD]}
            />
          </Box>
        </Box>
        <Box
          display='flex'
          paddingTop={10}
          marginBottom={10}
          alignItems='center'
          justifyContent='center'>
          <AuthButton
            variant='contained'
            endIcon={<MdArrowForward />}
            onClick={formik.handleSubmit}
            disabled={!formik.values[FormKeys.EMAIL] >= 1}>
            Login
          </AuthButton>
        </Box>
        <Box flex={1} textAlign='center' paddingY={6}>
          <Link
            style={{
              cursor: 'pointer',
            }}
            title='click to change password'
            onClick={handleEmailRequest}>
            Reset your password?
          </Link>
        </Box>
      </AuthCard>
      <Backdrop
        in={isLoading === 'pending' ? true : false}
        className={styles.back_drop}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <NotifitionAlert
        severity='error'
        onClose={closeError}
        open={error === null ? false : true}>
        {error === undefined ? 'Network Error' : error}
      </NotifitionAlert>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  authCard_paper: {
    width: '300px',
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
    [theme.breakpoints.up('md')]: {
      width: '400px',
    },
  },
  authCard_header: {
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.14)',
  },
  authCard_header_title: {
    marginBottom: '3px',
    textAlign: 'center',
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightLight.valueOf(500),
  },
  back_drop: {
    color: '#fff',
    zIndex: theme.zIndex.drawer + 1,
  },
  textField: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default AuthLogin;

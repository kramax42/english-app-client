import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { AllWordsBlock, MyWordsBlock } from 'components';
import MainLayout from 'layout/MainLayout';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 5,
    textAlign: 'center',
  },
});

export default function Index() {
  const classes = useStyles();

  return (
    <MainLayout title={'english-app'}>
      <Grid
        container
        className={classes.root}
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item>
          <AllWordsBlock />
        </Grid>
        <Grid item>
          <MyWordsBlock />
        </Grid>
      </Grid>
    </MainLayout>
  );
}

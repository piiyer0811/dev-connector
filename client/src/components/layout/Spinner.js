import React, { Fragment } from 'react';

const Spinner = () => {
  return (
    <Fragment>
      <img
        src='https://media3.giphy.com/media/Bhh76pAsE51uTfMcxU/giphy.webp?cid=ecf05e47zlmftfd3drctonhwyiv4mts7pmcrbaw3viia9lhv&rid=giphy.webp&ct=s'
        alt='Loading..'
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </Fragment>
  );
};

export default Spinner;

import React from 'react';
import Selection1 from './components/Selection1/Selection1';
import Selection2 from './components/Selection2/Selection2';
import Selection3 from './components/Selection3/Selection3';
import Selection4 from './components/Selection4/Selection4';
import Selection5 from './components/Selection5/Selection5';
const Product = () => {
  return (
    <React.Fragment>
      <div>
        <Selection1 />
        <Selection2 />
        <Selection3 />
        <Selection4 />
        <Selection5 />
      </div>
    </React.Fragment>
  );
};

export default Product;

import { useEffect, useState } from 'react';

import { Props } from './';

const useProductItem = (props: Props) => {
  const { productItem } = props;
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const qtd = parseInt(productItem.qtd);
    const price = parseFloat(productItem.amount);

    setSubTotal(price * qtd);
  }, [productItem]);

  return {
    subTotal,
  };
};

export default useProductItem;

import React, { useEffect, useRef, useState } from 'react';
import './StoreItems.css';
import StoreItem from './StoreItem/StoreItem';
import { getMembershipTier } from '../../../Helpers/auth';
import { Cart, Product } from '../../../Interfaces/interfaces';
import {motion} from 'framer-motion';
import { fetchAndSetStoreItems } from '../../../Helpers/store';

export default function StoreItems({
  cart,
  setCart,
  isSignedIn,
}: {
  cart: Cart;
  setCart: Function;
  isSignedIn: boolean;
}) {
  const [userTier, setUserTier] = useState<string>('Non-Member');
  const isInitialLoad = useRef(true);

  const [bagelItems,setBagelItems] = useState<Product[]>([]);
  const [pastryItems,setPastryItems] = useState<Product[]>([]);
  const [bundleItems,setBundleItems] = useState<Product[]>([]);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      getMembershipTier(setUserTier);
      fetchAndSetStoreItems(setBagelItems,setPastryItems,setBundleItems);
    }
  }, [isInitialLoad]);
  
  return (
    <section id='store' className='store-items-container'>
      <motion.h2 
        className='store-items-heading'
        id='store-item-heading'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{duration: 2.5}}
        viewport={{once: false}}
      >
        Introducing Brendel's Bagels: New York's Finest Bagels 
      </motion.h2>
      <ul>
        {
          bagelItems.map((storeItem: Product) => (
            <StoreItem
              key={storeItem._id}
              storeItem={storeItem}
              cart={cart}
              setCart={setCart}
              userTier={userTier}
              isSignedIn={isSignedIn}
              setUserTier={setUserTier}
            />
          ))
        }
      </ul>

      <motion.h2 
        className='store-items-heading'
        id='store-item-gift-heading'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{duration: 2.5}}
        viewport={{once: false}}
      >
        Gift Ideas Under $40:
        <br />
        Explore Our Brendel's Gift Selections!
      </motion.h2>
      <ul>
        {
          bundleItems.map((storeItem: Product)=>(
            <StoreItem
              key={storeItem._id}
              storeItem={storeItem}
              cart={cart}
              setCart={setCart}
              userTier={userTier}
              isSignedIn={isSignedIn}
              setUserTier={setUserTier}
            />
          ))
        }
      </ul>
    </section>
  );
}
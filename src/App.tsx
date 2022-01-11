import { useState } from 'react';
import { useQuery } from 'react-query';

import Card from './components/Card/Card';
import Item from './components/Item/Item';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

import { StyledButton, Wrapper } from './app.style';

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [cardOpen, setCardOpen] = useState(false);
  const [cardItems, setCardItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, items) => ack + items.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCardItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCardItems((prev) =>
      prev.reduce((act, item) => {
        if (item.id === id) {
          if (item.amount === 1) return act;
          return [...act, { ...item, amount: item.amount - 1 }];
        } else {
          return [...act, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <p>Something went wrong</p>;

  return (
    <Wrapper>
      <Drawer anchor='right' open={cardOpen} onClose={() => setCardOpen(false)}>
        <Card
          cartItems={cardItems}
          addToCard={handleAddToCart}
          removeFromCard={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCardOpen(true)}>
        <Badge badgeContent={getTotalItems(cardItems)} color='error'>
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;

import { CartItemType } from '../../App';
import CartItem from '../CardItem/CardItem';
import { Wrapper } from './Card.styles';

// type Props = {
//   cartItems: CartItemType[];
//   addToCard: (clickedItem: CartItemType) => void;
//   removeFromCard: (id: number) => void;
// };

// const Card: React.FC<Props> = ({ cartItems, addToCard, removeFromCard }) => {
//   const calculateTotal = (items: CartItemType[]) =>
//     items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
//   return (
//     <Wrapper>
//       <h2>Your Shopping Card</h2>
//       {cartItems.length === 0 ? <p>No items in cart.</p> : null}
//       {cartItems.map((item) => (
//         <CartItem
//           key={item.id}
//           item={item}
//           addToCart={addToCard}
//           removeFromCart={removeFromCard}
//         />
//       ))}
//       <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
//     </Wrapper>
//   );
// };

// export default Card;

const Card = ({ cartItems, addToCard, removeFromCard }) => {
  const calculateTotal = (items) =>
    items.reduce((ack, item) => ack + item.amount * item.price, 0);
  return (
    <Wrapper>
      <h2>Your Shopping Card</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCard}
          removeFromCart={removeFromCard}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Card;

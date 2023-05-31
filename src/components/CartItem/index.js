/* eslint-disable react/no-unknown-property */
import './index.css'
import {AiFillMinusSquare, AiFillPlusSquare, AiFillDelete} from 'react-icons/ai'
import {FaRupeeSign} from 'react-icons/fa'
import TestyContext from '../../context/TestyContext'

const CartItem = props => {
  const {cartItemDetails} = props
  const {id, name, imageUrl, cost, quantity} = cartItemDetails
  // console.log(cartItemDetails)

  return (
    <TestyContext.Consumer>
      {value => {
        const {onIncreaseQuantity, onDecreaseQuantity, onDeleteCartItem} = value
        const onIncrement = () => {
          onIncreaseQuantity(cartItemDetails)
        }

        const onDecrement = () => {
          onDecreaseQuantity(cartItemDetails)
        }

        const onClickDeleteItem = () => {
          onDeleteCartItem(id)
        }

        return (
          <li className="cart-item">
            <div className="cart-item-details-container" testid="cartItem">
              <div className="cart-item-img-container">
                <img className="cart-img" src={imageUrl} alt={name} />
                <h1 className="cart-heading"> {name} </h1>
              </div>
              <div className="plus-minus-count-container">
                <button
                  onClick={onDecrement}
                  type="button"
                  className="minus-btn"
                  testid="decrement-quantity"
                >
                  <AiFillMinusSquare />
                </button>
                <p testid="item-quantity"> {quantity}</p>
                <button
                  onClick={onIncrement}
                  type="button"
                  className="plus-btn"
                  testid="increment-quantity"
                >
                  <AiFillPlusSquare />
                </button>
              </div>
              <div className="rupees-const-container">
                <FaRupeeSign />
                <p testid="item-quantity"> {cost * quantity} </p>
              </div>
              <div className="delete-cart-container">
                <button
                  onClick={onClickDeleteItem}
                  className="delete-btn"
                  type="button"
                >
                  <AiFillDelete className="delete-icon" />
                </button>
              </div>
            </div>
          </li>
        )
      }}
    </TestyContext.Consumer>
  )
}

export default CartItem

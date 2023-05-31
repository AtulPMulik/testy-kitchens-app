/* eslint-disable react/no-unknown-property */
import {FaRupeeSign} from 'react-icons/fa'
import {AiFillStar} from 'react-icons/ai'

import TestyContext from '../../context/TestyContext'

import './index.css'

const FoodItem = props => {
  const {foodItemDetails} = props
  const {name, imageUrl, cost, rating} = foodItemDetails
  // console.log(foodItemDetails)

  return (
    <TestyContext.Consumer>
      {value => {
        const {onAddToCart} = value
        const onClickAddToCart = () => {
          onAddToCart(foodItemDetails)
        }
        return (
          <li className="food-item-card" testid="foodItem">
            <div className="food-item-container">
              <img className="food-img" src={imageUrl} alt={name} />
              <div className="food-item-text-container">
                <h1 className="food-item-heading"> {name} </h1>
                <div className="food-item-cost-container">
                  <FaRupeeSign />
                  <p> {cost} </p>
                </div>
                <div className="food-item-star-container">
                  <AiFillStar color="#FFCC00" />
                  <p> {rating} </p>
                </div>
                <button
                  onClick={onClickAddToCart}
                  className="add-btn"
                  type="button"
                >
                  Add
                </button>
              </div>
            </div>
          </li>
        )
      }}
    </TestyContext.Consumer>
  )
}

export default FoodItem

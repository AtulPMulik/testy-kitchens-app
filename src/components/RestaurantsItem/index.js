/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantsItem = props => {
  const {itemDetails} = props
  const {id, imageUrl, name, cuisine, userRating} = itemDetails
  const {rating, totalReviews} = userRating
  // console.log(itemDetails)
  return (
    <Link className="item-link" to={`/restaurant/${id}`}>
      <li className="list-item">
        <div className="item-container" testid="restaurant-item">
          <img className="image" src={imageUrl} alt="item" />
          <div className="item-text-container">
            <p className="item-name"> {name} </p>
            <p className="cuisine"> {cuisine} </p>
            <div className="rating-container">
              <AiFillStar color="#FFCC00" height="12px" width="12px" />
              <p className="rating">
                {rating} ({totalReviews})
              </p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantsItem

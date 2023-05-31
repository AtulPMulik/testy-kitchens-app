/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {FaRupeeSign, FaGripLinesVertical, FaDoorOpen} from 'react-icons/fa'
// import TestyContext from '../../context/TestyContext'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'

import Header from '../Header'
import FoodItem from '../FoodItem'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
}

class RestaurantDetails extends Component {
  state = {
    restaurantDetails: {},
    foodItemsDetailsList: [],
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  onSuccessFullyFetchingData = fetchedData => {
    const updatedData = {
      costForTwo: fetchedData.cost_for_two,
      cuisine: fetchedData.cuisine,
      id: fetchedData.id,
      imageUrl: fetchedData.image_url,
      itemsCount: fetchedData.items_count,
      location: fetchedData.location,
      name: fetchedData.name,
      opensAt: fetchedData.opens_at,
      rating: fetchedData.rating,
      reviewsCount: fetchedData.reviews_count,
      foodItemsList: fetchedData.food_items.map(eachItem => ({
        cost: eachItem.cost,
        name: eachItem.name,
        foodType: eachItem.food_type,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        rating: eachItem.rating,
      })),
    }
    // console.log(updatedData)
    this.setState({
      restaurantDetails: updatedData,
      foodItemsDetailsList: updatedData.foodItemsList,
      status: apiStatus.success,
    })
  }

  getRestaurantDetails = async () => {
    this.setState({status: apiStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    // console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccessFullyFetchingData(data)
    }
  }

  renderSuccessView = () => {
    const {restaurantDetails, foodItemsDetailsList} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      costForTwo,
      reviewsCount,
      opensAt,
    } = restaurantDetails
    return (
      <div className="restaurant-info-page">
        <div className="restaurant-info-card-container">
          <div className="restaurant-details-sec">
            <img className="card-img" src={imageUrl} alt="im" />
            <div className="rd-text-container">
              <div className="rd-heading-container">
                <h1 className="rd-heading"> {name} </h1>
                <p className="rd-open-at">
                  <FaDoorOpen className="open-door-icon" /> {opensAt}
                </p>
              </div>
              <p className="rd-paragraph"> {cuisine} </p>
              <p className="rd-paragraph"> {location} </p>
              <div className="rating-and-cost-container">
                <div className="rd-rating-container">
                  <AiFillStar className="rd-star" />
                  <p className="rd-rating">{rating}</p>
                </div>
                <FaGripLinesVertical className="v-bar" />
                <div className="rd-cost-container">
                  <FaRupeeSign className="rd-rupees" />
                  <p className="rd-price"> {costForTwo} </p>
                </div>
              </div>
              <div className="rd-count-container">
                <p className="rd-review-text"> {reviewsCount}+ Rating</p>
                <p className="rd-cost-for-two-text"> Cost for two </p>
              </div>
            </div>
          </div>
        </div>
        <ul type="none" className="rd-ul-container">
          {foodItemsDetailsList.map(each => (
            <FoodItem
              key={each.id}
              foodItemDetails={each}
              foodItemInfo={foodItemsDetailsList}
            />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderLoader = () => (
    <div className="rd-loader-container">
      <Loader type="BallTriangle" color="red" height={100} width={100} />
    </div>
  )

  renderRestaurantInfoOnApiStatus = () => {
    const {status} = this.state
    // console.log(status)
    switch (status) {
      case apiStatus.progress:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div
        className="restaurant-info-container"
        testid="restaurant-details-loader"
      >
        <Header />
        {this.renderRestaurantInfoOnApiStatus()}
      </div>
    )
  }
}

export default RestaurantDetails

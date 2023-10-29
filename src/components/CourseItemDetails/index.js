import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {courseItemList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseItemDetails()
  }

  getCourseItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.isLoading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const courseItemsApiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(courseItemsApiUrl)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        id: data.course_details.id,
        description: data.course_details.description,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
      }
      this.setState({
        courseItemList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getRetry = () => {
    this.getCoursesList()
  }

  renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        className="failure-view-image"
      />
      <div>
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
      </div>

      <button type="button" className="button" onClick={this.getRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="primedeals-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCourseItemDetails = () => {
    const {courseItemList} = this.state
    const {imageUrl, name, description} = courseItemList
    return (
      <div className="course-card">
        <img src={imageUrl} alt={name} className="course-image" />
        <div className="content-container">
          <h1 className="course-name">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  renderCoursesList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="course-item-container">{this.renderCoursesList()}</div>
      </div>
    )
  }
}

export default CourseItemDetails

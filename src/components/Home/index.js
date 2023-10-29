import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItem'
import Navbar from '../Navbar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {courseList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({apiStatus: apiStatusConstants.isLoading})
    const coursesApiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(coursesApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))

      this.setState({
        courseList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="primedeals-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

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

  renderCourses = () => {
    const {courseList} = this.state
    return (
      <ul className="list-container">
        {courseList.map(eachList => (
          <CourseItem eachList={eachList} key={eachList.id} />
        ))}
      </ul>
    )
  }

  renderCoursesList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourses()
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
        <div className="courses-container">
          <h1 className="main-heading">Courses</h1>
          {this.renderCoursesList()}
        </div>
      </div>
    )
  }
}

export default Home

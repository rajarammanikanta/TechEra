import {Link, withRouter} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {eachList} = props
  const {logoUrl, name, id} = eachList
  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="list-item">
        <img src={logoUrl} alt={name} />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default withRouter(CourseItem)

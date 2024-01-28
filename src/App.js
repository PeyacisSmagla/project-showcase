import './App.css'
import {Component} from 'react'
import React from "react"
import Loader from 'react-loader-spinner'
import ProjectShowCase from './components/ProjectShowCase'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatue = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class App extends Component {
  state = {projectList: [], api: apiStatue.initial, category: 'ALL'}

  componentDidMount() {
    this.getProjectList()
  }

  getProjectList = async () => {
    this.setState({api: apiStatue.inProgress})
    const {category} = this.state
    const options = {
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${category}`,
      options,
    )

    if (response.ok === true) {
      const data = await response.json()

      const updateProjectList = data.projects.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
      }))

      this.setState({projectList: updateProjectList, api: apiStatue.success})
    } else {
      this.setState({api: apiStatue.failure})
    }
  }

  onChangeSelect = event => {
    this.setState({category: event.target.value}, this.getProjectList)
  }

  onSuccessView = () => {
    const {projectList} = this.state

    return (
      <div>
        <ul className="ul-project">
          {projectList.map(each => (
            <ProjectShowCase details={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-project">
      <Loader type="ThreeDots" height={50} width={50} color="#00BFFF" />
    </div>
  )

  failureView = () => (
    <div className="failure-card-project">
      <img
        className="failure-image-project"
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-head-project">Oops! Something Went Wrong</h1>
      <p className="failure-para-project">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failure-button-project"
        onClick={this.getProjectList}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  finalResult = () => {
    const {api} = this.state
    switch (api) {
      case apiStatue.inProgress:
        return this.renderLoader()
      case apiStatue.success:
        return this.onSuccessView()
      case apiStatue.failure:
        return this.failureView()
      
    }
  }

  render() {
    const {category} = this.state
    return (
      <div>
        <nav className="nav-project">
          <img
            className="logo-project"
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="webite-logo"
          />
        </nav>

        <div className="container-project">
          <select
            className="select-project"
            value={category}
            onChange={this.onChangeSelect}
          >
            {categoriesList.map(each => (
              <option className="option-project" value={each.id} key={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
          {this.finalResult()}
        </div>
      </div>
    )
  }
}

export default App

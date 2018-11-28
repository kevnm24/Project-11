import React, { Component } from 'react';
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom';
import Validation from './Validation'

class CreateCourse extends Component {
  constructor(){
    super()
    this.state = {
      description:'',
      error:'',
      estimatedTime:'',
      id:'',
      materialsNeeded:'',
      title:'',
      user:''
    }
  }
  ChangeDesc = e => {
    this.setState({description: e.target.value})
  }
  ChangeMats = e => {
    this.setState({materialsNeeded: e.target.value})
  }
  ChangeTime = e => {
    this.setState({estimatedTime: e.target.value})
  }
  ChangeTitle = e => {
    this.setState({title: e.target.value})
  }




createNewCourse = (desc, mats, time, title) => {
  let banana = JSON.parse(window.localStorage.getItem('auth'))
  axios.post('http://localhost:5000/api/courses', {
    title: title,
    description: desc,
    estimatedTime: time,
    materialsNeeded: mats
  }, {
    headers: {
        'Authorization': banana
      }
  })
  .then( response => {
    this.props.history.push(`/courses/${response.data.id}`)
})
.catch(error => {
    if (error.response.status === 400){
      if (error.response.data.message !== "") {
      this.setState({
        error: error.response.data.message
      })
    }
    } else {
      this.props.history.push('/Error');
    }
  })
}


  handleSubmit = e => {
  e.preventDefault();
  this.createNewCourse( this.state.description, this.state.materialsNeeded, this.state.estimatedTime, this.state.title);
}

render(){
  let thisValid
  if (this.state.error !== ""){
        thisValid = <Validation error={this.state.error} />
            }
  return (
    <div className="bounds">
    { thisValid }
      <div className="bounds course--detail">
        <h1 >Create Course</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                    <div>
                      <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title" onChange={this.ChangeTitle} value={this.state.title} />
                    </div>
                 </div>
                <div className="course--description">
                <h4 className="description--label">Description</h4>
                  <div><textarea id="description" name="description" className="" placeholder="Course description" onChange={this.ChangeDesc} value={this.state.description} >
                  </textarea>
                </div>
                  </div>
                  </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.ChangeTime}  value={this.state.estimatedTime } />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials" onChange={this.ChangeMats} value={this.state.materialsNeeded } >
                        </textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><Link to="/"><button className="button button-secondary">Cancel</button></Link></div>
          </form>
        </div>
      </div>
    </div>
  );
 }
}

export default withRouter(CreateCourse);
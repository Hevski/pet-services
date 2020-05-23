import React from 'react'
import PropTypes from 'prop-types'

function serviceForm(props) {
    return (
      <div>
        <form>
          <p>Company Name:</p>
          <input type="text"></input>
          <p>Service Type:</p>
          <input type="text"></input>
          <p>URL:</p>
          <input type="text"></input>
          <div className="buttonContainer">
          <button className="formButton">Add</button>
          <button className="formButton">Cancel</button>
          </div>
        </form> 
      </div>
    )
}

serviceForm.propTypes = {

}

export default serviceForm


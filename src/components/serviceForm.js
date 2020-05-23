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
          <button>Add</button>
          <button>Cancel</button>
        </form> 
      </div>
    )
}

serviceForm.propTypes = {

}

export default serviceForm


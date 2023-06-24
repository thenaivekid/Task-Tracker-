import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className='header'>
        <h1 style={heading_style}>{title}</h1>
        <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close': "Add"} onClick={onAdd}/>
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string,
}

const heading_style = {
  color: 'gray',
  // backgroundColor: 'black',
}

export default Header
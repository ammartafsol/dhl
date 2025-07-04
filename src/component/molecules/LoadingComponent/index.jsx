import React from 'react'
import classes from "./LoadingComponent.module.css"
import { ThreeDot } from 'react-loading-indicators'

const LoadingComponent = ({size='large'}) => {
  return (
    <div className={classes.loading}>
    <ThreeDot color="var(--royal-navy-blue)" size={size} text="" textColor="" />
    </div>
  )
}

export default LoadingComponent
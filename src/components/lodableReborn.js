import React from "react"

import loadable from '@loadable/component'

const RebornComponent = loadable(() => import('../components/RebornInput'))

function LoadableReborn() {
  return (
    <div>
      <RebornComponent />
    </div>
  )
}

export default LoadableReborn
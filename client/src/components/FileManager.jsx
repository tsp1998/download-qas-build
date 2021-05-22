import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

//components
import Loader from './Loader'

//utils
import getQueryParams from '../utils/getQueryParams'

//apis
import { getBuildFiles } from '../apis/awsApis'

const FileManager = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [buildFiles, setBuildFiles] = useState([])
  const [error, setError] = useState('')

  useEffect(async () => {
    setIsLoading(true)
    const { history: { location: { search } } } = props;
    const queryParams = getQueryParams(search)

    if (queryParams.buildNumber) {
      try {
        const buildFiles = await getBuildFiles(queryParams.buildNumber) || []
        setBuildFiles(buildFiles)
      } catch (error) {
        console.log(`error`, error)
      }
      setError('')
    } else {
      if (!error) {
        setError('Please Provide Build Number in URL')
      }
    }

    setIsLoading(false)
  }, [])

  return (
    <div className="file-manager">
      <div className="text-bold">File Manager</div>
      {
        isLoading ?
          <Loader /> :
          error ?
            error :
            buildFiles.map((buildFile, i) => (
              <div key={`file_${i}`} className="build-file">
                {buildFile}
              </div>
            ))
      }
    </div>
  )
}

export default withRouter(FileManager)

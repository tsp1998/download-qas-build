import React, { useEffect, useState } from 'react'

//components
import Loader from './Loader'

//apis
import { getBuildFiles } from '../apis/awsApis'

const FileManager = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [buildFiles, setBuildFiles] = useState([])

  useEffect(async () => {
    setIsLoading(true)
    const buildNumber = '8.3.0.591'; //TODO get from url query
    try {
      const buildFiles = await getBuildFiles(buildNumber)
      setBuildFiles(buildFiles)
    } catch (error) {
      console.log(`error`, error)
    }
    setIsLoading(false)
  }, [])

  return (
    <div className="file-manager">
      <div className="text-bold">File Manager</div>
      {
        isLoading ?
          <Loader /> :
          buildFiles.map((buildFile, i) => (
            <div key={`file_${i}`} className="build-file">
              {buildFile}
            </div>
          ))
      }
    </div>
  )
}

export default FileManager

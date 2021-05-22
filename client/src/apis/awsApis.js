//data
import buildFilesMap from '../data/buildFilesMap'

const getBuildFiles = buildNumber => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(buildFilesMap[buildNumber]) // TODO get files from actual api
  }, 5000);
})

export { getBuildFiles }
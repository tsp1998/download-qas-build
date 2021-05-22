const loginWithJira = userType => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('abchijhsuihu872676t4'); //TODO call actual JIRA api based on user type
    }, 5000);
  })
}

export { loginWithJira }
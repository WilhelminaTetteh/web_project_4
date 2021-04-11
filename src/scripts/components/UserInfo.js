class UserInfo {
  constructor({ userName, userJob }) {
    this.userName = document.querySelector(userName);
    this.userJob = document.querySelector(userJob);
  }
  getUserInfo() {
    return {
      userName: this.userName.textContent,
      userJob: this.userJob.textContent
    };
  }
  setUserInfo(newName, newJob) {
    this.userName.textContent = newName;
    this.userJob.textContent = newJob;
  }
}
export default UserInfo;

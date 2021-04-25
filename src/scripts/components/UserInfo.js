class UserInfo {
  constructor({ userName, userJob,avatar }) {
    this.userName = document.querySelector(userName);
    this.userJob = document.querySelector(userJob);
    this.avatar = document.querySelector(avatar);
  }
  getUserInfo() {
    return {
      userName: this.userName.textContent,
      userJob: this.userJob.textContent
    };
  }
  setUserInfo({ newName, newJob, avatar }) {

    this.userName.textContent = newName;
    this.userJob.textContent = newJob;
    this.avatar.style.display = "block";
    this.avatar.src = avatar;
  }

  //Get user info from api then set values to localStorage userInfo=>key
  setPersistedUserInfo(userInfo){
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  //Retrieve stored user info from localStorage
  getPersistedUserInfo() {
    const stringifiedUserInfo = window.localStorage.getItem('userInfo');

    // Return user info in JSON format
    return JSON.parse(stringifiedUserInfo);
  }
  
}
export default UserInfo;

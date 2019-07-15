class User {
  constructor({
    displayName,
    email,
    emailVerified,
    isAnonymous,
    photoURL,
    phoneNumber,
    uid
  }) {
    this.uid = uid;
    this.phoneNumber = phoneNumber;
    this.displayName = displayName;
    this.email = email;
    this.emailVerified = emailVerified;
    this.isAnonymous = isAnonymous;
    this.photoURL = photoURL;
  }
}

export default User;

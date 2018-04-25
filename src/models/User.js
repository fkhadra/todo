class User {
  constructor({
    displayName,
    email,
    emailVerified,
    isAnonymous,
    photoUrl,
    phoneNumber,
    uid
  }) {
    this.uid = uid;
    this.phoneNumber = phoneNumber;
    this.displayName = displayName;
    this.email = email;
    this.emailVerified = emailVerified;
    this.isAnonymous = isAnonymous;
    this.photoUrl = photoUrl;
  }
}

export default User;

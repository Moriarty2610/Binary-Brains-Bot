module.exports = {
  hasRole(membersArray, user_id, roleName) {
    let member = membersArray.get(user_id);
    return member.roles.cache.some(role => role.name == roleName)
  }
};
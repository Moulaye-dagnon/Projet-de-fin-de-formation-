export function isCanChagetStatusOrPriority({ isAssigneTo, user, projets }) {
  if (projets.owners.includes(user.id)) {
    return true;
  }
  if (user.id == isAssigneTo) {
    return true;
  }
  return false;
}

export function isAdmin({ user, projets }) {
  if (projets.owners.includes(user.id)) {
    return true;
  }

  return false;
}

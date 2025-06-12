export function isCanChagetStatusOrPriority({ item, user, projets }) {
  if (projets.owners.includes(user.id)) {
    return true;
  }
  if (user.id == item.item.assignTo) {
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

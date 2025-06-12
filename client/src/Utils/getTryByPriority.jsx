const getPriorityNumber = (priority) => {
  switch (priority) {
    case "hight":
      return 3;
      break;
    case "medium":
      return 2;
      break;
    case "low":
      return 1;
      break;
    default:
      return 0;
  }
};

export const SortByPriorityAndOrder = (tasks) => {
  return tasks.sort((a, b) => {
    const priorityA = getPriorityNumber(a.priority);
    const priorityB = getPriorityNumber(b.priority);
    if (priorityA != priorityB) {
      return priorityB - priorityA;
    }
    return a.order - b.order;
  });
};

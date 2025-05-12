export const OrderedFunction = (Tasks) => {
  const priorityOrder = { hight: 1, medium: 2, low: 3 };

  return Tasks.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
};

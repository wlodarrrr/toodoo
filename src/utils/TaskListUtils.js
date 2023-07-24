export function getAllTags(tasks) {
  return [...new Set(tasks.flatMap((task) => task.tags).sort())];
}

export function getAllProjects(tasks) {
  return [
    ...new Set(
      tasks
        .filter((task) => task.project !== '')
        .flatMap((task) => task.project)
        .sort()
    ),
  ];
}

export function getFilteredTasks(tasks, filterCriteria) {
  const { showCompleted, selectedProject, searchText, selectedTags } = filterCriteria;

  const filteredTasks = tasks.filter((task) => {
    const isCompletionMatch = showCompleted || task.completionDate === null;
    const isProjectMatch = selectedProject === '' || selectedProject === task.project;
    const isTagsMatch = selectedTags.every((tag) => task.tags.includes(tag));

    const isSearchTextInSummary = task.summary.toLowerCase().includes(searchText.toLowerCase());
    const isSearchTextInTags = task.tags.some((tag) => tag.toLowerCase().includes(searchText.toLowerCase()));
    const isSearchTextInProject = task.project.toLowerCase().includes(searchText.toLowerCase());

    return (
      isCompletionMatch &&
      isProjectMatch &&
      (isSearchTextInProject || isSearchTextInSummary || isSearchTextInTags) &&
      isTagsMatch
    );
  });

  return filteredTasks;
}

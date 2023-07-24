export function convertStringToTask(message) {
    let project = "";
    let tags = [];
    let summary = message;
  
    let hashIndex = summary.indexOf("#");
    if (hashIndex > -1) {
      let spaceIndex = summary.indexOf(" ", hashIndex);
      if (spaceIndex < 0) spaceIndex = summary.length;
      project = summary.slice(hashIndex + 1, spaceIndex);
      summary =
        summary.slice(0, hashIndex) + summary.slice(spaceIndex, summary.length);
    }
  
    while (summary.indexOf("@") > -1) {
      let atIndex = summary.indexOf("@");
      let spaceIndex = summary.indexOf(" ", atIndex);
      if (spaceIndex < 0) spaceIndex = summary.length;
      tags.push(summary.slice(atIndex + 1, spaceIndex));
      summary =
        summary.slice(0, atIndex) + summary.slice(spaceIndex, summary.length);
    }
  
    summary = summary.trim();
  
    return {
      id: crypto.randomUUID(),
      summary: summary,
      project: project,
      tags: tags,
      creationDate: new Date(),
      completionDate: null,
    };
  }
  
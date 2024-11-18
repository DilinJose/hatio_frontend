import axios from 'axios';

const exportSummaryAsGist = async (projectTitle, completedTodos, totalTodos, pendingTodos, completedTasks) => {
  const token = 'YOUR_GITHUB_TOKEN'; // Replace with your GitHub token
  const summary = `# ${projectTitle}\n\n## Summary\n${completedTodos} / ${totalTodos} completed.\n\n## Section 1: Pending Todos\n${pendingTodos.map(todo => `- [ ] ${todo}`).join('\n')}\n\n## Section 2: Completed Todos\n${completedTasks.map(task => `- [x] ${task}`).join('\n')}`;
  const gistData = {
    description: 'Project Summary Export',
    public: false,
    files: {
      [`${projectTitle}.md`]: {
        content: summary
      }
    }
  };

  try {
    const response = await axios.post('https://api.github.com/gists', gistData, {
      headers: {
        Authorization: `token ${token}`
      }
    });
    console.log('Gist created:', response.data.html_url);
    saveGistLocally(response.data.files[`${projectTitle}.md`].content);
  } catch (error) {
    console.error('Error creating gist:', error);
  }
};

const saveGistLocally = (content) => {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'summary.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default exportSummaryAsGist;

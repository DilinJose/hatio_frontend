import axios from "axios";
import { saveAs } from 'file-saver';

export const generateMarkdown = (project) => {
    const { title, todos } = project;

    const completed = todos.filter((todo) => todo.status);
    const pending = todos.filter((todo) => !todo.status);

    return `
  # ${title}
  
  **Summary:** ${completed.length} / ${todos.length} completed.
  
  ## Pending Tasks
  ${pending.map((task) => `- [ ] ${task.description}`).join('\n')}
  
  ## Completed Tasks
  ${completed.map((task) => `- [x] ${task.description}`).join('\n')}
    `;
};


export const createSecretGist = async (markdown, fileName, token) => {
    const response = await axios.post("https://api.github.com/gists",
        {
            files: { [`${fileName}.md`]: { content: markdown }, },
            description: 'Project Todo Summary', public: false
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }
    );
    if (!response.ok) {
        throw new Error(`Failed to create gist: ${response.statusText}`);
    }
    const gist = await response.json();
    return gist.html_url;
};


export const saveToLocalFile = (markdown, fileName) => {
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  saveAs(blob, `${fileName}.md`);
};
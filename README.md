**Github issues ReactJS app**

We will be building a user interface to manage the issues of a given repository. The app will have two views/pages:

1. List of issues: [Github issues page for freeCodeCamp
   ](https://github.com/freeCodeCamp/freeCodeCamp/issues) to use a reference for the project.
2. Issue detail : [Github issues page for freeCodeCamp of a single issue](https://github.com/freeCodeCamp/freeCodeCamp/issues/35765) to use a reference for the project.

NOTE: Use any UI framework like react material-ui, react-bootstrap, ant design to build the app. Use momentJS to handle dates (optional)

**Phase 1**

Use the json file provided as the data source.
User stories for List of issues view:

- List all issues of the repository
- Sort issues by newest, oldest, recently updated, least recently updated
- Filter issues by state (open/close), by author, by labels,.
- Search box - by text

**Phase 2**

Replace the json as data source with a fetch call to Github API.
User stories for List of issue view:

- Pagination for list of issues
  User stories for issue detail view:
- Display issue details like - author, body, comments, status, labels
- Add comment
- Delete comment
- Open/Close an issue
- Add / remove labels

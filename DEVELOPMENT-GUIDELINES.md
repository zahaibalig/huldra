# Huldra Development Guidelines

## General Information

### Software Repository

- In consistency with other Simula Metropolitan Center for Digital Engineering (SimulaMet) Department of Holistic Systems (HOST) internal repositories, we are currently using the name `huldra-internal` for the software repository, the codebase has no dependency on the name/address of the repository
- Those who have access to the repository and project board: members of the SimulaMet-HOST GitHub organization (admin access), Huldra master students (write access), and Huldra interns (write access)

### Documentation

- This repository includes a `README.md` file, which refers to all other relevant documentation
- Format cheat sheets for all documentation can be found [here](https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax) and [here](https://guides.github.com/features/mastering-markdown/)

## Development

### Use of Branches

- We use the `dev` branch for development (protected branch: merge possible only after PR with at least 1 review)
- We use the `main` branch for releases (protected branch: merge possible only by selected users)
- We currently employ no staging or release candidate branch
- The development branch `dev` should always compile and pass all tests
- All development should begin in branches created from `dev`
- Feature branches should be named according to the issue or feature they target, e.g., `release-guidelines`, `bugfix/issue-123`, `new-feature/multiple-uuids`, `improvement/db-analysis`
- Regularly merge `dev` into your feature branch to avoid conflicts later on, especially if you take multiple days to complete your task
- Check the [full list of branches](https://github.com/simulamet-host/huldra-internal/branches/all) from time to time to delete unused/stale branches that you have created

### Code Syntax, Logging, and Requirements

- We will start using [lint](<https://en.wikipedia.org/wiki/Lint_(software)>) for syntax and style checks on our codebase very soon
- All try-catch blocks should have accompanying log messages indicating the values assigned to critical variables, as well as exception messages (if any)
- Document your code as well as possible, including inline comments as well as updates to existing documents if any
- Never commit code containing hardcoded credentials or confidential information to a remote branch
<!---
- Use the Huldra uniform logging framework as frequently as appropriate for your code
- Update requirements and guideline documents whenever your code introduces new dependencies
  -->

### Issue Tracking

- We use the [Huldra Project Board](https://github.com/orgs/simulamet-host/projects/4/views/1) for issue tracking
- You can find the list of all labels [here](https://github.com/simulamet/host/huldra-internal/labels)
- We use [milestones](https://github.com/simulamet-host/huldra-internal/milestones) to associate all our issues with planned releases or completion dates

### Commits

- Commits should be as atomic as possible (i.e., make minimal changes per commit)
- Use common tense, e.g., [imperative mood](https://en.wikipedia.org/wiki/Imperative_mood) in all your commit messages
- You can commit freely in issue/feature branches as long as your proposed changes do not break the development branch when merged

### Pull Requests

- All production-ready branches must be merged to the development branch with a pull request (PR)
- Make sure that your branch passes all tests before creating a PR
- Add a comment while creating the PR, summarizing all changes made by the branch (can be more detailed than the sum of commit messages)
- Assign at least one reviewer for every PR you open (confirm the availability of reviewers beforehand)
- If the PR is addressing a tracked issue, you can use keywords `fixes` or `closes` to associate it to the relevant issue (it is also possible to connect the PR with an existing issue using the GitHub web interface)
- Remind reviewers of the PR if they fail to provide a review in more than 2 days
- Merge the PR into the development branch as soon as you get an approval from all reviewers
- Close the branch associated with the PR after the PR is merged

### Reviews

- If you are assigned as a reviewer, try to provide your review within 2 days
- Provide an assesment of the code as diligently as possible, and feel free to ask for as many changes as necessary
- It is the responsibility of the developer who is making the PR to merge it into the development branch, however if you merge the PR, make sure to delete the associated branch afterwards (and inform the developer)

<!---
### Testing
- All unit tests must pass on a feature branch before creating a PR towards `dev`
- A Continuous Integration (CI) framework is being developed for the purpose of automated branch testing
-->

### Versioning and Releases

- We use [software versioning](https://en.wikipedia.org/wiki/Software_versioning) on our releases
- All releases must include sufficient documentation
- See `RELEASE-GUIDELINES.md` for further details

## Additional Notes

- Never hesitate to contact other members of the Huldra team for questions, comments, and assistance!

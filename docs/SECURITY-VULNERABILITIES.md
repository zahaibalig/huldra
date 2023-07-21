# Resolving Security Vulnerabilities.

The Github repository uses Dependabot for security vulnerabilities in the node packages that are being used. If detected, Dependabot will look for a patched version and create Pull Request accordingly. On the pull request, Dependabot will try to resolve any conflict that might happen while merging.

Once Dependabot creates a PR, it is advised to read the release notes of that particular package, check if there is any breaking changes introduces, and finally, pull the branch to the local environment and check thoroughly if everything is working perfectly or not, specially if there is any major version change suggested.

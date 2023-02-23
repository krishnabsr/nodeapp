# nodeapp
app to retrieve gists


I've written the code as much as possible with node's https module instead of axios. As an initial step do 1) npm install 

UTILS.js : 
============

takes input from command prompt for either username or gist id. It will check with a regex if its a gist id or not and then makes the appropriate request to github api. the api endpoint is api.github.com

example node utils.js octocat

index.js
===========

1) written api endpoint to retrieve gists for a username and specific gist for a id. 

this will run on localhost. eg... http://localhost:3000/gists/octocat

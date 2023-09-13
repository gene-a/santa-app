# Requirements
## Client Side:
- Check that the child is registered
	- Error if
		- If the child is not registered (no match for the user id) display an error message
		- If the child is more than 10years old, the webapp should display a basic error page with an error message explaining the problem.
	- Success if
		- If the child is registered and less than 10 years old, the server should show a page indicating that the request has been received.
			- the server can fetch user and profiles

## Server Side:
- Every 15seconds, the server should send an email with information on all pending (not yet sent) requests including:
	- child username (eg. charlie.brown)
	- child's address (eg. 219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo)
	- request free text as was input in the form
	- Email sender should be set as do_not_reply@northpole.com, and sent to santa@northpole.com

# Changes made (package.json, and file changes):
- Ran npm audit
	- Updated packages that had some vulnerabilities using npm audit fix
- Added UUID for unique id generation for wishes
- Added JSDocs for functions for documentation
- Added nodemon to automate documentation generation as necessary, docs are now stored in the docs folder.
  - I've elected not to serve them as I'm assuming the site is for prod use only. Ideally this can be served through the dev portal.
- Added nodemailer package for the interval mailer
- Updated vite react plugin
- Replaced "Request" with Axios because it is apparently deprecated
- Replaced deprecated body-parser with express
- Replaced deprecated morgan
- Replaced engine version to 18.x (have 18.16.1 on my machine)
- Since we're using vite
	- I replaced the scripts.start value to run vite instead
	- Removed client.js (I'm guessing this was default from glitch)
		- From my understanding we now just have index.js which is bundled by Vite

# Personal Notes:
Thank you for giving me the opportunity to work on this it was a lot of fun learning Node, NPM, and a bit of React!
I am a C# developer and have used the .NET framework extensively. I have no specific JS framework that I use but am fine with Vanilla JS.
I tried my best to translate the knowledge I have from ASP .NET to attempt to implement html rendering on the server side and serve up the API.
This was quite a challenge as I had to learn Node and React in a day or so as the assignment was given during a time I was away from Tokyo. 

It was quite enjoyable.
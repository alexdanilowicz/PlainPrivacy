# ![Logo](images/logo_48.png) Plain Privacy

Collaborators: Chris Bertasi, Alexander Danilowicz, Dylan Hong, and Teddy Ni.

### What is It?
Plain Privacy is a Google Chrome Extension built for Hack Dartmouth IV. When you visit a website, the extension crawls the page for its privacy policy. If a policy is found, the extension lights up, parses the privacy policy using Natural Language Processing, and then displays concise, relevant information to the user.

### The Motivation Behind Plain Privacy:
> "Most Americans have no idea what they are signing up for because... terms of service are beyond comprehension."
\- Senator Lindsey Graham in the *New York Times*, April 11, 2018.

 As concerns over data privacy have been become catapulted into the limelight, lawmakers and every day people have become aware of the need to understand Internet privacy policies. However, privacy policies and terms of service with jargon are becoming increasingly complex.

 According to an [article in the  Atlantic](https://www.theatlantic.com/technology/archive/2012/03/reading-the-privacy-policies-you-encounter-in-a-year-would-take-76-work-days/253851/), "every Internet user, were they to read every privacy policy on every website they visit would spend 25 days out of the year just reading privacy policies."

 Plain Privacy changes that. You should know what information you're giving out without having to sift through legal jargon.

### How We Built It:

We used javascript, python, and the [Google Cloud Natural Language API](https://cloud.google.com/natural-language/).

The core parts of the Chrome Extension are built in Javascript. Python is used for the server and NLP.

### The Future and Scaling:

Legal documents, such as privacy policies are becoming more complicated, but users want things as simple as possible. Plain Privacy could be applied to other documents, and turn into a paid service for lawmakers and every day users.

# ![Logo](images/logo_48.png) Plain Privacy

Collaborators: Chris Bertasi, Alexander Danilowicz, Dylan Hong, and Teddy Ni.

- **Finalist at HackDartmouth IV**
- **Winner of the One of Best Uses of a Google API at Hack Dartmouth IV**

### What is It?
PlainPrivacy automatically summarizes and highlights keywords in the privacy policies of the websites you visit built for Hack Dartmouth IV. When you visit a website, the extension crawls the page for its privacy policy. If a policy is found, the extension lights up, parses the privacy policy using Natural Language Processing, and then displays what the website collects and why it collects that information.

We built the server and wrote the NLP in Python. You can see our server repository here: [Plain Privacy Server](https://github.com/alexdanilowicz/PlainPrivacyServer).

### The Motivation Behind Plain Privacy:
> "Most Americans have no idea what they are signing up for because... terms of service are beyond comprehension."
\- Senator Lindsey Graham in the *New York Times*, April 11, 2018.

 As concerns over data privacy have been become catapulted into the limelight, lawmakers and every day people have become aware of the need to understand Internet privacy policies. However, privacy policies and terms of service with jargon are becoming increasingly complex.

 According to an [article in the  Atlantic](https://www.theatlantic.com/technology/archive/2012/03/reading-the-privacy-policies-you-encounter-in-a-year-would-take-76-work-days/253851/), "every Internet user, were they to read every privacy policy on every website they visit would spend 25 days out of the year just reading privacy policies."

 Plain Privacy changes that. You should know what information you're giving out without having to sift through legal jargon.

### How We Built It:

We used javascript and python, and a little bit of HTML and CSS.

The core parts of the Chrome Extension are naturally built off of Google Chrome Extension features and Javascript. Python is used for the server and natural language processing.

### The Future and Scaling:

Legal documents, such as privacy policies are becoming more complicated, but users want things as simple as possible. Plain Privacy could be applied to other documents, and turn into a paid service for lawmakers and every day users.

TIMELINE
===


## Table of Contents

* [Table of Contents]
* [Beginners Guide]
* [User story]
* [User flows]
* [Limitations]

## Beginners Guide

If you are a total beginner to our app, start here!

1. Visit https://expo.io/tools#client
2. Download Expo Client on your iOS or Android device
3. Scan the QR Code or click on the link to our app 
   ![](https://i.imgur.com/1iagBnv.png=30px)

   
5. Start using TIMELINE on Expo Client on your device!

User story
---

```gherkin=
Feature: Follow a news tag

Scenario: the user sees a tag that she is interetsed in
     When the user sees a tag that she is interetsed in
     Then the user clicks on follow to follow the tag

Scenario: the user sees a piece of news that she is interetsed in
     When the user sees a piece of news that she is interetsed in
    Given there is not any auto-generated tag that fits her need
     Then the user clicks on the tag button to create a tag
```

```gherkin=
Feature: Browse the timeline of a news tag

Scenario: the user wants to check the timeline of a tag
    Given the timelines of tags are already generated
     When the user wants to check the timeline of a tag
     Then the user clicks on the tag to check its timeline
```

User flows
---
User follows an exisiting tag
```sequence
Note left of User: Sees a tag 
User->TIMELINE: Follows the tag
Note right of TIMELINE: Adds the tag to her tag list
TIMELINE-->User: Returns the new list of tags
User->TIMELINE: Clicks on a tag
TIMELINE-->User: Returns the timeline of the tag
```

User creates a new tag
```sequence
Note left of User: Sees a piece of news 
User->TIMELINE: Creates a new tag for the news
Note right of TIMELINE: Adds the tag to her tag list
Note right of TIMELINE: Generates a timeline for the tag
TIMELINE-->User: Returns the new list of tags
User->TIMELINE: Clicks on a tag
TIMELINE-->User: Returns the timeline of the tag
```

Limitations
---
1. News is only collected from U.S. news sources since only news in English can be displayed properly in News API, which is the API we use for news collection. 
2. News is collected using only a limited amount of predefined tags
3. New users are able to sign up and log in but the profile page is not yet implemented 
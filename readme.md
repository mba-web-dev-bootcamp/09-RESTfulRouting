# RESTful Routing

## 29-244 - Introduction
* Define REST and explain WHY it matters
* List all 7 RESTful routes
* Show examples of RESTful routing in practice
* 
REST - A mapping between HTTP routes and CRUD

CREATE
READ
UPDATE
DESTROY


RESTFUL ROUTES

name    url         verb    - description
============================================================
INDEX   /dogs           GET     - Display a list of all dogs

NEW     /dogs/new       GET     - Show new dog form, then redirect to CREATE
CREATE  /dogs           POST    - Create new dog, then redirect somewhere

SHOW    /dogs/:id       GET     - Shows info about one dog

EDIT    /dogs/:id/edit  GET     - Show edit form for one dog
UPDATE  /dogs/:id       PUT     - Update a particular dog, then redirect somewhere


# 29-245 - Blog Index
* Setup the Blog App
* Create the Blog Model
* Add INDEX route and template
* Add Simple Nav Bar


# 29-246 - Basic Layout
* Add Header and Footer Partials
* Include Semantic UI
* Add Simple Nav


# 29-247 - Putting the C in CRUD
* Add NEW route
* Add NEW template
* Add CREATE route
* Add CREATE template


# 29-248 - SHOWtime
* Add Show route
* Add Show template
* Add links to show page
* Style show template


# 29-249 - Edit/Update
* Add Edit Route
* Add Edit Form
* Add Update Route
* Add Update Form
* Add Method-Override


# 29-250 - DESTROYYYYYYYY
* Add Dstroy Route
* Add Edit and Destroy Links


# 29-251 - Final Updates
* Sanitize blog body
* Style Index
* Update REST Table

### <img src="cobra.png" alt="bonus" width="20"/> Cobra game Front End <img src="cobra.png" alt="bonus" width="20"/>

  - Cel mai jmecher card game
  - production version is avaible at [cobra.tk](https:cobra.tk)

### How to run the app locally
- comment the third line in the js.js file:
    ``` js
    3 var socket = io.connect('https://cobras.herokuapp.com/')
    ```
- then uncomment the 6th line in the js.js file:
    ``` js
    6 var socket = io.connect('http://localhost:3000/')
    ```
- make sure the back end is running on your local machine ( it should be running on port 3000)
- open the index.html file in a web browser

### How to run the app using the heroku backend / how to push it to master
- uncomment the third line in the js.js file:
    ``` js
    3 var socket = io.connect('https://cobras.herokuapp.com/')
    ```
- then comment the 6th line in the js.js file:
    ``` js
    6 var socket = io.connect('http://localhost:3000/')
    ```
- open the index.html file in a web browser



### Warning: Do not push onto the master brench with the 'localhost:3000' set as a endpoint instead of 'https://cobras.herokuapp.com/'  it will break the app!




### Recomanded
- use vs code with eslint installed
- the config file for eslint is already setup (included in the project folder)

To intall eslint:
-   use vscode packet manager serach for it install it and reaload vs code after that run:
    ```
    $ npm install
    $ npm install -g eslint
    ```

### Misc info
 - The front end is hosted  on firebase and is continuously integrated using travis ci meaning that when you push on the master brach or you merge a pull request with the master brench the latest version gets deployed to firebase at cobra.tk
<img src="bonus.png" alt="bonus" width="250"/>

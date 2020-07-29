# AniMミ <img src = './assets/animeicon_480.png' width ='40px' height ='40px' />


AniMミ is an app that simplifies the process for searching and saving anime suggestions. It provides functionality for English and Japanese titles.

<img src ='./demoSources/listView.png' width = '190px'/><img src = './demoSources/anime detail page.png' width = '190px' /><img src = './demoSources/savedList.png' width = '190px' />

## Tech Stack
<table>
   <tr>
    <td align="center"><img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" width="65" /></td>
    <td align="center"><img src="https://miro.medium.com/max/1200/1*m5RYM_Wkj4LsZewpigV5tg.jpeg" width="65" /></td>
     <td align="center"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/62/MySQL.svg/1200px-MySQL.svg.png" width="65"/></td>
  </tr>
</table>

### front end
 * React Native
 * React Native-Elements
### back end
 * MySQL
 * Node.JS
 
## Prerequisites
Before you run pre-production code, ensure you have met the following requirements:

- You have access to an Iphone simulator on your local machine via XCode.
- You have MySQL running on your local machine.
- You have NodeJS, [npm](https://www.npmjs.com/), and a code editor such as VScode. 

## Install and Run
<img src = './demoSources/aniME video.gif'  align="right"/>

Use the package manager [npm](https://www.npmjs.com/) to install all of the dependencies. Run the following command in your project directory.

```
npm install
```
After installing the dependencies, open MySQL and create a local database instance with the **schema.sql** file.

1. Login to your MySQL Shell

```bash
mysql -u root -p 
```

2. Create the new DB instance by running the following in your MySQL shell:

```bash
source schema.sql 
```

3.  Launch the project with your IOS simulator:

```bash
npm run expo start --ios
```

## Contact
You can contact me at [tyler.rhodes@aya.yale.edu](tyler.rhodes@aya.yale.edu)

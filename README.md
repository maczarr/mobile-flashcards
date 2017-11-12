# Flashcards
Flashcards is an Android-App that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards with questions and answers to those decks, then take quizzes on those decks. It reminds the user daily at 7pm to take a quiz if the user hasn't taken one on this day. Flashcards is an App for Udacitys React Nanodegree.

## Installation
You need [yarn](https://yarnpkg.com/) on your machine. Simply clone this project with git or download it as a ZIP. To unzip the file you need a tool like "unzip", "7-Zip" or "WinZip"). The yarn commands might need sudo/root permissions on your system.

Steps with git in your terminal:
```
git clone https://github.com/maczarr/mobile-flashcards.git
cd mobile-flashcards
yarn install
yarn start
```

or after downloading the ZIP-File using unzip from the directory where the download was saved:
```
unzip mobile-flashcards-master.zip
cd mobile-flashcards-master
yarn install
yarn start
```

If `yarn start` hangs on your machine it might be necessary to increase the max. user watches and instances. To do this temporarily run the following commands before running `yarn start`:
```
sudo sysctl -w fs.inotify.max_user_instances=1024
sudo sysctl -w fs.inotify.max_user_watches=20000
```

You can check these values before running the commands above:
```
cat /proc/sys/fs/inotify/max_user_instances
cat /proc/sys/fs/inotify/max_user_watches
```

## Contributing

This being a Udacity students project I most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
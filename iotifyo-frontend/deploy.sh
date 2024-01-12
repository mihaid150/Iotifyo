echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to the server..."
pscp -r build/* mihai@192.168.1.103:/var/www/192.168.4.1

echo "Done!"
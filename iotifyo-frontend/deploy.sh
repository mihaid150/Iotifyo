echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to the server..."
pscp -r build/* mihai@192.168.0.101:/var/www/iotifyo

echo "Done!"
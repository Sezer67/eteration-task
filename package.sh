rm -rf node_modules
rm package-lock.json
echo $"old files deleted"

npm i
echo $"npm packages was done"

# bundle install --path vendor/bundle
cd ios
rm -rf Pods
rm -rf Podfile.lock

pod install
# bundle exec pod install
echo $"pods was done"

cd ..
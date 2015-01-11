cd builds
git init
git remote add origin https://github.com/arcym/bananabomber.git
git checkout -b gh-pages
git add --all
git commit -m "Deploying to Github."
git push origin gh-pages -f
cd ..

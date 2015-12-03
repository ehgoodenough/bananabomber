git clone https://github.com/ehgoodenough/bananabomber --branch gh-pages shares

node build bundle

mkdir -p ./shares/$1
cp ./builds/web1/index.html ./shares/$1/index.html

git --git-dir=./shares/.git --work-tree=./shares add $1
git --git-dir=./shares/.git --work-tree=./shares commit -m "Pushed $1"
git --git-dir=./shares/.git --work-tree=./shares push origin gh-pages

rm -rf shares

echo
echo Share your build by going to:
echo https://ehgoodenough.github.io/bananabomber/$1
echo

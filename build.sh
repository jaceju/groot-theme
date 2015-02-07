#!/bin/sh

# Initialize
rm -rf gh-pages && mkdir gh-pages && cd $_
git init
git remote add origin git@github.com:jaceju/groot-theme.git
git checkout -b gh-pages

# Build tar files
cd - && tar cfvz gh-pages/groot-theme.tar.gz *.html build && cd -

# install.sh
touch install.sh
echo "#!/bin/sh"
echo "mkdir groot-theme && cd groot-theme" >> install.sh
echo "curl -L -# http://jaceju.github.io/groot-theme/groot-theme.tar.gz | tar xz" >> install.sh
echo "cd .." >> install.sh

# Publish
git add .
git commit -m "Build"
git push -u origin +gh-pages

# Clean
cd ..
rm -rf gh-pages

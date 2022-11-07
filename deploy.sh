chmod a+x

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

timestamp(){
   date +"%d.%m.%Y um %H:%M"
}

node oykuleriYenile.js
node haftalariYenile.js
git add -A
git commit -m "new stories $(timestamp)"
git push -f git@github.com:emrergin/korogluoykuleri.git main

cd -
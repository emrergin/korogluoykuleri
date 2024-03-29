# Köroğlu Öyküleri

This project of mine is just a fancy user interface for all the stories that were written in the online (free) story workshop I hosted for 16 months, between April 2020-August 2021. Stories from this workshop can be found [here](https://atolye.cyclic.app/) (in Turkish). The website does not do anything a properly set Google Sheets could not, but I still like to have things this way.

It uses a similar logic with and many code refactors from my [Bookshelf Project](https://github.com/emrergin/kutuphane).

I thank **Hacer Noğman**, a student of mine from the workshop, for constant suggestions and bug testing.

## What I learned:
- Border spacing only works for tables as whole.
- ``a:hover`` color does not effect ``a:visited``. You need to combine both to get the desired effect.
- Default sort puts all Turkish characters to the end. You need to use LocalCompare. See here: https://gist.github.com/ugurozpinar/9682734.
- For some reason, I was only able to use an inline listener for a table head. I should look into this.
- I learned about brightness filter to make things darker. Just like my style.
- There might be big performance costs, even with small projects like this, if a function is used inside a loop mistakenly.
- Used CIELAB coloration for even numbered rows and hover effects, using: https://accessiblepalette.com/.

### Sources
- Favicon: https://pixabay.com/images/id-2022464/
- https://shancarter.github.io/mr-data-converter/ is a godsend.

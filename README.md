# Movie-fight-comparison-

This is the movie fight application, the idea here is there are two movie search fields on the page, user is going to search for a movie on the left hand side 
and the different one on the right hand side. When the user search a perticular movie the information (like the poster, name, about, box-office collection,
critics rating etc.) about movie is fetch from an API. After fetching the information on both sides the application will compare the stats of the movies and
the higher statistic will get highlighted in green color and the lower statistic is highlighted in yellow color.
The given search fields are autocomplete inputs, even the user search for a word instead of full movie name the application fetch all the movies related to that
word and it will display the movie all names along with poster on the popup autocomplete widget.
The omdb API is used for this application. For styling I use Bulma CSS framework and the Axios library for network requests. 

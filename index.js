const autoCompleteConfig = {
    renderOption (movie){
        const imgSrc = movie.Poster === "N/A" ? '' : movie.Poster; 
        return `
            <img src='${imgSrc}'/>
            <h1>${movie.Title}</h1>(${movie.Year})
        `;
    },
    inputValue(movie){
        return movie.Title; 
    },
    async fetchData(searchTerm){
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: '69f80292',
                s: searchTerm
            }
        });
        if(response.data.Error){
            return [];
        }
        return response.data.Search;
    }
}

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
    }
});
createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
    },
});
 
let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '69f80292',
            i: movie.imdbID
        }
    });
    summaryElement.innerHTML = movieTemplate(response.data);

    if(side === 'left'){
        leftMovie = response.data;
    }else{
        rightMovie = response.data;
    }

    if(leftMovie && rightMovie){
        runComparison();
    }
};

const runComparison = () =>{
   const leftSideStats = document.querySelectorAll('#left-summary .notification');
   const rightSideStats = document.querySelectorAll('#right-summary .notification');

   leftSideStats.forEach((leftstat, index) => {
       const rightstat = rightSideStats[index];
       
       const leftSideValue = parseInt(leftstat.dataset.value);
       const rightSideValue = parseInt(rightstat.dataset.value);

       if(rightSideValue > leftSideValue){
            leftstat.classList.remove('is-primary');
            leftstat.classList.add('is-warning');
       }else{
        rightstat.classList.remove('is-primary');
        rightstat.classList.add('is-warning');
       }

   });
};


const movieTemplate = (movieDetail) => {
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metaScore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
    const awards = (movieDetail.Awards).split(' ').reduce((prev, word)=>{
        const value = parseInt(word);

        if(isNaN(value)){
            return prev;
        }else{
            return prev + value;
        }
    }, 0);

    return `
    <article class='media'>
        <figure class='media-left'>
           <p class='image'>
              <img src='${movieDetail.Poster}'/>  
           </p>
        </figure>
        <div class='media-content'>
            <div class='content'>
                <h1>${movieDetail.Title}</h1>    
                <h4>${movieDetail.Genre}</h4>    
                <p>${movieDetail.Plot}</p>    
            </div>
        </div>
    </article>
    <article data-value=${awards} class='notification is-primary'>
        <p class='title'>${movieDetail.Awards}</p>
        <p class='subtitle'>Awards</p>
    </article>
    <article data-value=${dollars} class='notification is-primary'>
        <p class='title'>${movieDetail.BoxOffice}</p>
        <p class='subtitle'>BoxOffice</p>
    </article>
    <article data-value=${metaScore} class='notification is-primary'>
        <p class='title'>${movieDetail.Metascore}</p>
        <p class='subtitle'>Metascore</p>
    </article>
    <article data-value=${imdbRating} class='notification is-primary'>
        <p class='title'>${movieDetail.imdbRating}</p>
        <p class='subtitle'>imdbRating</p>
    </article>
    <article data-value=${imdbVotes} class='notification is-primary'>
        <p class='title'>${movieDetail.imdbVotes}</p>
        <p class='subtitle'>imdbVotes</p>
    </article>
    `;
}
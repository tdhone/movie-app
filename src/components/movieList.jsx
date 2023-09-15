import React from "react";

function MovieList(props) {
    const FavouriteComponent = props.favouriteComponent;
    return (
        <>
            {props.movies.map((movie, index) =>
                <div className="image-container  w-25 m-2 p-2 d-flex justyfy-content-start ">
                    <img src={movie.Poster} key={movie.imdbID} className="img-thumbnail" alt="movie"></img>
                    <div onClick={()=>props.handleFavouriteClick(movie)} className="overlay d-flex align-item-center justify-content-center">
                        <FavouriteComponent />
                    </div>
                </div>)}
        </>
    )
}

export default MovieList;
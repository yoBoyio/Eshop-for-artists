import { Chip } from "@material-ui/core";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    color: "black",
    background: "#F8F8FF",
    flexWrap: "wrap",
  },
  genres_area: {
    position: "relative",
    bottom: "10px",
  },
}));

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  itemIds,
}) => {
  const classes = useStyles();

  // const handleAdd = (genres) => {
  //   setSelectedGenres([...selectedGenres, genres]);
  //   setGenres(genres.filter((g) => g.id !== genres.id));
  //   console.log(selectedGenres);
  // };

  useEffect(() => {
    return () => {
      // setGenres({}); // unmounting
    };
  }, []);

  return (
    <div className={classes.genres_area} style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.text}
            key={genre.id}
            color="primary"
            clickable
            size="small"
          />
        ))}
      {genres &&
        genres.map((g) => (
          <Chip
            className={classes.root}
            style={{ margin: 2 }}
            label={g.text}
            key={g.id}
            clickable
            size="small"
            // onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;

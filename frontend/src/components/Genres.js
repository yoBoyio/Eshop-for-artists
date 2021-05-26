import { Chip } from "@material-ui/core";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    color: "white",
    background: "#9d50bb",
    flexWrap: "wrap",
  },
  genres_area: {
    position: "relative",
    marginBottom: "30px",
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

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
  };

  useEffect(() => {
    return () => {
      setGenres({}); // unmounting
    };
  }, []);

  return (
    <div className={classes.genres_area} style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            color="primary"
            clickable
            size="small"
          />
        ))}
      {itemIds &&
        itemIds.map((genre) => (
          <Chip
            className={classes.root}
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            clickable
            size="small"
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;

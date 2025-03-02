import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { TextField, InputAdornment, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";

import { useTripContext } from "../context/TripContext";
import useAutocompleteStyle from "../styles/useAutocompleteStyle";

export default function AutocompletePlaces({
  nextPath,
  isSearchIcon,
  variant,
  placeType,
}) {
  const [destination, setDestination] = useState();
  const [inputValue, setInputValue] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [sessionToken, setSessionToken] = useState();
  const { tripDataRaw, setTripDataRaw } = useTripContext();
  const classes = useAutocompleteStyle();
  const history = useHistory();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(tripDataRaw);

    if (tripDataRaw && tripDataRaw.destination) {
      history.push(nextPath);
    }
  };

  const handleFinalSelection = (e, newValue) => {
    console.log("value changed");
    setDestination(newValue);
  };

  // use effect for suggestions
  useEffect(() => {
    console.log("use effect inputValue fired");

    const getCitySuggestions = async (sessionToken, prefix) => {
      try {
        const body = {
          prefix: inputValue,
          sessionToken,
          type: placeType === "accommodation" ? "address" : "cities",
        };
        const { data } = await axios.post(
          "https://eazytrips-backend.herokuapp.com/autocomplete",
          body
        );
        console.log(data);
        setCitySuggestions(data.predictions || []);
      } catch (err) {
        console.log(err);
      }
    };

    if (inputValue) {
      getCitySuggestions();
    }
  }, [inputValue, sessionToken, placeType]);

  // use effect for final call to google places
  useEffect(() => {
    const getPlacesDetails = async () => {
      try {
        const place_id = citySuggestions.find(
          (city) => destination === city.description
        ).place_id;

        console.log("place_id is", place_id);

        const { data } = await axios.get(
          `https://eazytrips-backend.herokuapp.com/autocomplete/${place_id}`
        );

        // either set accommodation or destination dependent on route and set all required fields
        if (placeType === "destination") {
          setTripDataRaw({
            destination: data.placeAddress,
            destinationCoords: data.placeCoords,
            transportation: {},
            tripStarts: "",
            tripEnds: "",
          });
        }

        if (placeType === "accommodation") {
          setTripDataRaw({
            ...tripDataRaw,
            accommodation: data.placeAddress,
            accommodationCoords: data.placeCoords,
          });
        }

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (destination) {
      getPlacesDetails();
      console.log("submitted");
    }
    // eslint-disable-next-line
  }, [destination]);

  // useEffect for session token for gplaces API
  useEffect(() => {
    setSessionToken(uuidv4());
  }, []);

  return (
    <form onSubmit={handleSearchSubmit}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={citySuggestions.map((city) => city.description)}
        renderInput={(params) => (
          <TextField
            {...params}
            className={classes.searchBar}
            id="input-with-icon-textfield"
            variant={variant}
            InputProps={{
              ...params.InputProps,
              type: "search",
              endAdornment: isSearchIcon && (
                <InputAdornment position="end">
                  <Button
                    className={classes.submitButton}
                    size="small"
                    type="submit"
                  >
                    <SearchIcon color="primary" />
                  </Button>
                </InputAdornment>
              ),
              className: classes.input,
              disableUnderline: true,
            }}
            size="medium"
            placeholder="Enter a destination"
            fullWidth={false}
            value={inputValue}
          ></TextField>
        )}
        onChange={(e, newValue) => handleFinalSelection(e, newValue)}
        onInputChange={(e, newValue) => {
          console.log("input changed");
          setInputValue(newValue);
        }}
      />
    </form>
  );
}

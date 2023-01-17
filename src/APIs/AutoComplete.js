import React from "react";
import { InfoIcon } from "@chakra-ui/icons";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  FormControl,
  InputLeftElement,
  FormLabel,
  InputGroup,
  Input,
} from "@chakra-ui/react";

export default function AutoComplete(props) {
  const { handleSetLocation, Loc } = props;

  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    handleSetLocation(value);
    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <FormControl isRequired>
              <FormLabel>Location</FormLabel>
              <InputGroup>
                <InputLeftElement children={<InfoIcon />} />
                <Input {...getInputProps({ placeholder: Loc })} />
              </InputGroup>
            </FormControl>

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

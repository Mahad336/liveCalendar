import React, { useEffect } from "react";
import { InfoIcon } from "@chakra-ui/icons";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import {
  FormControl,
  InputLeftElement,
  FormLabel,
  InputGroup,
  Input,
} from "@chakra-ui/react";

export default function AutoComplete(props) {
  const { handleSetLocation } = props;
  const [address, setAddress] = React.useState("");

  //waiting for Location to be defined to set address
  useEffect(() => {
    setAddress(props.LOC);
  }, [props.LOC]);

  //setting address and getting Location value
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    handleSetLocation(value);
    setAddress(value);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={(value) => {
          setAddress(value);
        }}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <InputGroup>
                <InputLeftElement children={<InfoIcon />} />
                <Input {...getInputProps({ placeholder: props.LOC })} />
              </InputGroup>
            </FormControl>

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                console.log(suggestion);
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

import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useBubbletownApi from "../helpers/useBubbletownApi";
// import { colourOptions } from '../data';

const colourOptions = [
  { value: "asdadgfasg", label: "Bebida de choco" },
  { value: "13asda", label: "Bebida de fre" },
];

const animatedComponents = makeAnimated();

export default function AnimatedMulti(props) {
  const { data: Participantes, loading } = useBubbletownApi({
    path: `participantes`,
  });

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      //   width: "100%",
      padding: 20,
    }),
    // control: () => ({
    //   // none of react-select's styles are passed to <Control />
    //   width: 200,
    // }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  // Converts an arrays of _ids to an array of values, label tags
  function formatSelectInput(array) {
    const formatedArray = array.map((item) => {
      var f = {};
      f["value"] = item._id;
      f["label"] = item.nombre;
      return f;
    });
    // console.log(formatedArray);
    return formatedArray;
  }

  

  // Get Product formated { labels, value } from ids array
  function completeMatchId(allProducts, arrayIds) {
    const arrayIntersection = allProducts.filter((x) =>
      arrayIds.includes(x._id)
    );
    const formatedArrayIntersection = formatSelectInput(arrayIntersection);
    // console.log(formatedArrayIntersection);
    return formatedArrayIntersection;
  }

  if (loading) return <CircularProgress />;
  return (
    <>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={formatSelectInput(Participantes.Participantes || [], props.values || [])}
        onChange={props.handleChange}
        noOptionsMessage={() => <>No quedan más Participantes.Participantes</>}
        // value={completeMatchId(Participantes.Participantes || [], props.values || [])}
        placeholder="Seleccione uno o más Participantes"
        isMulti
        styles={customStyles}
        options={formatSelectInput(Participantes.Participantes)}
        onFocus={props.onFocus}
      />
      <h1>{props.value}</h1>
    </>
  );
}

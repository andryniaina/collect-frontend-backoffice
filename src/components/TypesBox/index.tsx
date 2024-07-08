import "./index.css";
import { types } from "./typesData";
import Type from "./Type";

const TypesBox = ({onClick} :any) => {
  return (
    <div className="types-box">
      {types.map((type: any) => {
        return <Type label={type.label} value={type.value} onClick={onClick} />;
      })}
    </div>
  );
};

export default TypesBox;

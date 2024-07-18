import "./index.css";

interface Props {
  label: string;
  value?: string;
  onClick?: any;
}

const Type = ({ label, onClick , value  }: Props) => {
  return <div className="type-box" onClick={()=>onClick(value)}>{label}</div>;
};

export default Type;

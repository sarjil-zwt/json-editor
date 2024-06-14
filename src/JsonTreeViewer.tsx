import { useState } from "react";

const JsonTreeViewer = ({ data, basePath = "data" }: any) => {
  const [dropdownState, setDropdownState] = useState<{
    path: any;
    position: any;
  }>({ path: null, position: null });

  const renderNode = (node: any, path: string) => {
    if (Array.isArray(node)) {
      return (
        <div className="leftpadding">
          {"["}
          <div className="nodeitems">
            {node.map((item, index) => {
              const newPath = `${path}[${index}]`;
              return (
                <div
                  key={newPath}
                  id={newPath}
                  className={`nodeitem ${
                    typeof item !== "object" ? "lastnode" : ""
                  }`}
                >
                  {typeof item === "object" ? (
                    ""
                  ) : (
                    <button onClick={() => handleClick(newPath)}>
                      {item.toString()}
                    </button>
                  )}
                  {renderNode(item, newPath)}
                </div>
              );
            })}
          </div>
          {"]"}
        </div>
      );
    } else if (typeof node === "object" && node !== null) {
      return (
        <div className="leftpadding">
          {"{"}
          <div className="nodeitems">
            {Object.keys(node).map((key) => {
              const newPath = `${path}.${key}`;
              return (
                <div
                  key={newPath}
                  id={newPath}
                  className={`nodeitem ${
                    typeof node[key] !== "object" ? "lastnode" : ""
                  }`}
                >
                  <button onClick={() => handleClick(newPath)}>{key}:</button>
                  {typeof node[key] === "object" ? "" : node[key].toString()}
                  {renderNode(node[key], newPath)}
                </div>
              );
            })}
          </div>
          {"},"}
        </div>
      );
    } else {
      return null;
    }
  };

  const handleClick = (path: string) => {
    // const buttonElement = event.currentTarget as HTMLElement;
    const element = document?.getElementById(path);
    // const rect = buttonElement.getBoundingClientRect();
    const rect: any = element?.getBoundingClientRect();

    setDropdownState({
      path,
      position: {
        top: rect?.top + window.scrollY,
        left: rect?.left + rect?.width + window.scrollX + 100,
      },
    });
  };

  const [entries, setEntries] = useState<any>({});
  const [options, setOptions] = useState([
    "name",
    "team_id",
    "base_currency",
    "base_currency_name",
  ]);
  const [floating, setFloating] = useState(false);

  return (
    <div className="main">
      <>
        {floating && (
          <div className="floating">
            <button className="floatingbtn" onClick={() => setFloating(false)}>
              close
            </button>
            {Object?.keys(entries).map((key) => {
              return (
                <p>
                  <span>{key}:</span>
                  {entries[key]}
                </p>
              );
            })}
          </div>
        )}
        {!floating && (
          <button className="floatingbtn" onClick={() => setFloating(true)}>
            Show Entries
          </button>
        )}
      </>
      {renderNode(data, basePath)}
      {dropdownState.path && dropdownState.position && (
        <div
          className="dropdown"
          style={{
            position: "absolute",
            top: dropdownState.position.top,
            left: dropdownState.position.left + 30, // Adjust this value as needed to position the dropdown
          }}
        >
          <div>
            <strong>Path:</strong> {dropdownState.path}
          </div>
          <select
            name=""
            id=""
            onChange={(e) => {
              setEntries((prev: any) => {
                return { ...prev, [e.target.value]: dropdownState.path };
              });
              setOptions((options) => {
                return options?.filter((option) => {
                  return option != e.target.value;
                });
              });
              setDropdownState({ path: null, position: null });
            }}
          >
            <option value={""}></option>;
            {options?.map((option) => {
              return <option value={option}>{option}</option>;
            })}
          </select>
        </div>
      )}
    </div>
  );
};

export default JsonTreeViewer;

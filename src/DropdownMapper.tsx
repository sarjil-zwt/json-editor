import { useState } from "react";

const json = {
  id: 1,
  name: "Parent",
  children: [
    {
      id: 2,
      name: "Child 1",
      children: [],
    },
    {
      id: 3,
      name: "Child 2",
      children: [
        {
          id: 4,
          name: "Grandchild 1",
          children: [],
        },
      ],
    },
  ],
};

const DropdownMapper = () => {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedChild, setSelectedChild] = useState<any>(null);

  const renderDropdown = (nodes: any, handleChange: any) => {
    return (
      <select onChange={handleChange}>
        <option value="">Select a node</option>
        {nodes.map((node: any) => (
          <option key={node.id} value={node.id}>
            {node.name}
          </option>
        ))}
      </select>
    );
  };

  const handleNodeChange = (e: any) => {
    const nodeId = parseInt(e.target.value);
    const node = findNodeById(json, nodeId);
    setSelectedNode(node);
    setSelectedChild(null); // Reset selected child when parent changes
  };

  const handleChildChange = (e: any) => {
    const childId = parseInt(e.target.value);
    const child = findNodeById(selectedNode, childId);
    setSelectedChild(child);
  };

  const findNodeById = (node: any, id: any) => {
    if (node.id === id) {
      return node;
    }
    for (let child of node.children) {
      const result: any = findNodeById(child, id);
      if (result) {
        return result;
      }
    }
    return null;
  };

  return (
    <div>
      <h1>Node Mapper</h1>
      {renderDropdown([json], handleNodeChange)}
      {selectedNode && selectedNode?.children?.length > 0 && (
        <>
          <h2>Select Child Node</h2>
          {renderDropdown(selectedNode?.children, handleChildChange)}
        </>
      )}
      {selectedChild && (
        <div>
          <h3>Selected Child: {selectedChild?.name}</h3>
        </div>
      )}
    </div>
  );
};

export default DropdownMapper;

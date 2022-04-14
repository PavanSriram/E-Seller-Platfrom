import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

function CategoryDropdown() {
  return (
    <Dropdown className="d-inline mx-2" bsPrefix="red">
      <Dropdown.Toggle id="dropdown-autoclose-true">
        Default Dropdown
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">Menu Item</Dropdown.Item>
        <Dropdown.Item href="#">Menu Item</Dropdown.Item>
        <Dropdown.Item href="#">Menu Item</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CategoryDropdown;

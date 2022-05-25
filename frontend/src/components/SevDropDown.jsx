import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu,
} from "@coreui/react";
function SevDropDown() {
  return (
    <CDropdown>
      <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem href="#">Action</CDropdownItem>
        <CDropdownItem href="#">Another action</CDropdownItem>
        <CDropdownItem href="#">Something else here</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
}

export default SevDropDown;

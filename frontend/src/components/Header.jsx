import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";

function Header() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className=" bg-slate-900 flex items-center justify-between px-8 h-[50px] z-40">
      <div className="font-bold text-[15px]">WDK-CRM</div>

      <div className="">
        <ul className="hidden sm:flex items-center justify-center text-white space-x-5 text-[15px] px-12 ">
          {["Dashboard", "Tickets", "Logout"].map((item) => (
            <li className="px-1 font-comorants hoverText" key={`link-${item}`}>
              <div className=" hover:border" />
              <div className="flex items-center jsutify-center">
                <a href={`#${item}`}>{item}</a>
              </div>
            </li>
          ))}
        </ul>

        <div className=" sm:hidden h-[40px] relative flex items-center justify-center ]">
          {!toggle ? (
            <HiMenuAlt4
              className=" text-[#dde1e7] hover:text-[#519f8d] cursor-pointer mr-8 h-8 w-8"
              onClick={() => setToggle(!toggle)}
            />
          ) : (
            <div className="container z-40">
              <HiX
                className="hoverText m-3 w-[20px] h-[20px] cursor-pointer "
                onClick={() => setToggle(false)}
              />
            </div>
          )}

          <div
            className={`fixed top-0 right-0 z-10 h-screen w-[50vw] 
            flex flex-col justify-end items-end 
            bg-[#0e214b] ${
              toggle ? "translate-x-0" : "translate-x-full"
            } ease-out duration-700  shadow-2xl`}
          >
            <ul className="h-[100%] w-full flex flex-col justify-start items-start space-y-5 mt-32">
              {["Dashboard", "Tickets", "Logout"].map((item) => (
                <li
                  key={item}
                  className="hoverText w-[100%] flex items-start justify-center"
                >
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

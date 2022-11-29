import React, { useEffect, useRef, useState } from "react";
import { getFonts } from "../../../util/services/fontServices";
import { GFONTS_BASE_URL } from "./constants";
import { loadPreviewStylesheet } from "./loadStylesheet";
import chevronDown from "./chevron.svg";
import "./index.css";
import useDelayUnmount from "./useDelayUnmount";
import ListItem from "./ListItem";

interface Props {
  value: string;
  id?: string;
  onChange: (value: string, e: React.MouseEvent) => void;
  limit?: number;
  sort?: "alpha" | "popularity";
  fontSize?: number;
  style?: React.CSSProperties;
}

const mountedStyle = { animation: "slidein 200ms ease-in forwards" };
const unmountedStyle = {
  animation: "slideout 200ms ease-in forwards",
};

export const FontPicker: React.FC<Props> = ({
  value,
  id,

  onChange,
  limit = 250,
  sort = "alpha",
  fontSize = 14,
  style,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [fonts, setFonts] = useState<{ family: string }[]>([]);
  const [previewFontURL, setPreviewFontURL] = useState<string | null>(null);
  const [sortedByPopularity, setSortedByPopularity] = useState<
    { family: string }[]
  >([]);
  const isOptionsOpen = useDelayUnmount(isMounted, 250);

  const hasRendered = useRef(false);

  const handleChange: React.MouseEventHandler<HTMLLIElement> = (e) => {
    const target = e.target as HTMLLIElement;
    onChange(target.innerText, e);
    setIsMounted(!isMounted);
  };

  // Select option when pressing enter
  const handlePressEnter = (e: any) => {
    if (e.key === "Enter") {
      handleChange(e);
    }
  };

  // Fetch the fonts from the API
  useEffect(() => {
    if (!hasRendered.current) {
      getFonts().then((res) => {
        console.log("font result: ", res);
        if (res) setFonts(res.splice(0, limit));
      });
    }

    return () => {
      hasRendered.current = true;
    };
  }, [limit]);

  useEffect(() => {
    if (fonts.length > 0 && sort !== "alpha") {
      setSortedByPopularity(fonts);
    }
  }, [sort, fonts]);

  // Sort fonts by popularity or alphabetical
  useEffect(() => {
    if (sort === "alpha") {
      setFonts(fonts.sort((a, b) => a.family.localeCompare(b.family)));
    } else if (sort === "popularity" && sortedByPopularity.length > 0) {
      setFonts(sortedByPopularity);
    }
  }, [fonts, sort, sortedByPopularity]);

  // Generate the preview fonts URL
  useEffect(() => {
    let previewURL = "";
    let isComplete = false;
    if (fonts.length > 0) {
      for (let i = 0; i < fonts.length; i++) {
        previewURL += `${fonts[i].family}&family=`;

        if (i === fonts.length - 1) {
          isComplete = true;
        }
      }
    }

    if (isComplete) {
      setPreviewFontURL(
        GFONTS_BASE_URL +
          previewURL.replaceAll(" ", "+").slice(0, previewURL.length - 8) +
          "&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz12&display=swap"
      );
    }
  }, [fonts]);

  // load preview stylesheet
  useEffect(() => {
    if (previewFontURL) {
      loadPreviewStylesheet(previewFontURL);
    }
  }, [previewFontURL]);

  return (
    <div
      className="font-picker"
      id={id}
      style={style}
      aria-label={"Select font"}
      title={"Select font"}
    >
      <div
        className={`font-picker-input ${isOptionsOpen ? "show-options" : ""}`}
        style={{ fontSize: fontSize }}
        aria-haspopup="listbox"
        aria-expanded={isOptionsOpen}
        onClick={() => setIsMounted(!isMounted)}
      >
        {value}
        <img className="icon" src={chevronDown} alt={"Chevron Down Icon"} />
      </div>

      {isOptionsOpen && (
        <ul
          className="font-picker-options"
          role="listbox"
          style={isMounted ? mountedStyle : unmountedStyle}
          aria-activedescendant={value}
          tabIndex={-1}
        >
          {fonts.length > 0 &&
            fonts.map((font, i) => (
              <ListItem
                key={font.family}
                value={value}
                font={font}
                fontSize={fontSize}
                handleChange={handleChange}
                handlePressEnter={handlePressEnter}
              />
            ))}
        </ul>
      )}

      {isOptionsOpen && (
        <div
          className="backdrop"
          onClick={() => setIsMounted(!isMounted)}
        ></div>
      )}
    </div>
  );
};

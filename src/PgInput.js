import React, { useEffect, useState, useRef } from "react";
import Background from "./Background";
import BarChart from "./BarChart";
import Highlight from "./Highlight";
import wordFrequency from "./WordFrequency";

function PgInput() {
  const [query, setQuery] = useState("canvas");
  const [oldQuery, setOldQuery] = useState("canvas");
  const [words, setWords] = useState("");
  const textArea = useRef();
  const [mostFrequent, setMostFrequent] = useState("");
  const [scrollTop, setScrollTop] = useState(0);

  // Uses icon-buttons to hide/show image, graph, or input text
  const [buttons, setButtons] = useState({
    img: true,
    graph: true,
    textBlock: true
  })

  useEffect(() => {
    const interval = setInterval(() => {
      //trim text to fix empty word error
      const frequencyAnalysis = wordFrequency(textArea.current.innerText.trim());
      setMostFrequent(frequencyAnalysis[0]);
      setWords(frequencyAnalysis[1]);
      if (oldQuery !== mostFrequent) {
        setOldQuery(query);
        setQuery(mostFrequent);
      }
      //Firefox fix of contentEditable containing a <br> element when backspace is used to remove last text
      if (textArea.current.innerHTML.toLowerCase() === "<br>") {
        setQuery("");
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [query, oldQuery, mostFrequent]);

  function handleScroll() {
    setScrollTop(textArea.current.scrollTop);
  }

  function handleButtonClick(property) {
    setButtons(prevState => ({
      ...prevState,
      [property]: !prevState[property]
    }));
  }
  return (
    <>
      <div className="icon-box">
        <i className={`bi bi-image button-icon ${buttons.img ? null : "button-off"}`} onClick={() => handleButtonClick('img')}></i>
        <i className={`bi bi-bar-chart-fill button-icon ${buttons.graph ? null : "button-off"}`} onClick={() => handleButtonClick('graph')}></i>
        <i className={`"bi bi-body-text button-icon ${buttons.textBlock ? null : "button-off"}`} onClick={() => handleButtonClick('textBlock')}></i>
      </div>
      {buttons.img ? <Background query={query ? query : "canvas"}/> : null}
      {query && buttons.graph ? <BarChart words={words} barCount={20} /> : <BarChart words={words} barCount={0} />}
      <p className="most-frequent">{mostFrequent}</p>
      <div className="input-area">
        <p hidden={!buttons.textBlock} onScroll={handleScroll} contentEditable ref={textArea}></p>
      </div>
      {buttons.textBlock ? <Highlight textAreaRef={textArea} highlightText={mostFrequent} scrollTop={scrollTop} /> : null}
    </>
  );
}

export default PgInput;
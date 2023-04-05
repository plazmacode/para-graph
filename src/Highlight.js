import React, { useEffect, useRef } from "react";

function Highlight(props) {
  const textArea = props.textAreaRef.current;
  const highlightText = props.highlightText;
  const highlightElement = useRef(null);
  const scrollTop = props.scrollTop;

  //Highlights text by putting a <span> around it
  const highlightRegex = new RegExp(`\\b(${highlightText})\\b`, 'gi');
  const highlightedText = textArea ? textArea.innerHTML.replace(highlightRegex, '<span>$1</span>') : null;

  useEffect(() => {
    highlightElement.current.scrollTop = scrollTop;
  }, [scrollTop])

  return (
    <div className="highlight">
      <p ref={highlightElement} dangerouslySetInnerHTML={{__html: highlightedText}}/>
    </div>
  )
}

export default Highlight;
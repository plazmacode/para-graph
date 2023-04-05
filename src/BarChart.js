import React, { useEffect } from "react";

function BarChart(props) {
  useEffect(() => {
    const words = props.words;
    const barCount = props.barCount;
    // Sort the words by their frequency
    const sortedWords = Object.keys(words).sort((a, b) => words[b] - words[a]).slice(0, barCount);
    const sortedFrequency = sortedWords.map(word => words[word]);

    // Set up the canvas context and calculate the bar dimensions
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const barWidth = canvasWidth / barCount;
    const maxFrequency = Math.max(...sortedFrequency);
    const barHeightRatio = canvasHeight / maxFrequency;

    // Draw the bars in the chart
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  for (let i = 0; i < barCount; i++) {
    const barHeight = sortedFrequency[i] * barHeightRatio;
    context.fillStyle = "#0077be";
    context.fillRect(i * barWidth, canvasHeight - barHeight, barWidth - 1, barHeight);
    context.fillStyle = "#FFF";
    if (typeof sortedWords[i] !== "undefined") {
      context.fillText(sortedWords[i], i * barWidth + barWidth / 2 - (context.measureText(sortedWords[i]).width / 2), canvasHeight - 5);
    }
  }

  }, [props])

  return (
    <canvas width="1600" height="800"></canvas>
  )
}

export default BarChart;
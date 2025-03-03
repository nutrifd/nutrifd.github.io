import ChordDiagram from "react-chord-diagram";

export default function ChordChart(props) {
    const {matrix, labels, width, height} = props;
    function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    let colors = new Array(matrix.length).fill(1).map(getRandomColor);
    return (
        <ChordDiagram
          matrix={matrix}
          componentId={1}
          width={width}
          height={height}
          style={{ font: "10px sans-serif", padding: "15px" }}
          groupColors={colors}
          groupLabels={labels}
        />
      );
}
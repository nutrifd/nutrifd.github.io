import Graph from "react-graph-vis";
import { useHistory } from "react-router-dom";

export default function NetworkGraphChart(props) {
    const { data } = props;
    let history = useHistory();
    let networkData = {
        'nodes': data.nodes,
        'edges': data.edges.map(d => {
            return { ...d, 'from': d.source, 'to': d.target }
        }),
        'nodes_router': data.nodes_router,
    }
    const options = {
        height: '450px',
        width: '700px',
        nodes: {
            shape: "dot",
            font: {
                face: "Tahoma",
            },
        },
        edges: {
            smooth: {
                type: "continuous",
            },
        },
        interaction: {
            tooltipDelay: 200,
            hideEdgesOnDrag: true,
        },
        physics: {
            stabilization: false,
            barnesHut: {
                gravitationalConstant: -10000,
                springConstant: 0.002,
                springLength: 150,
            },
        },
    }
    const events = {
        select: function (event) {
            var { nodes } = event;
            if (nodes.length === 1) {
                let router = networkData.nodes_router[nodes[0]];
                history.push(router);
            }
        }
    };
    return <Graph graph={networkData} options={options} events={events} />
}
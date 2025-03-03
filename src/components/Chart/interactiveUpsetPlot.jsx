import {VegaLite, createClassFromSpec} from 'react-vega';

const VLspec = ({
  "data": {"name": "data"},
  "transform": [
    {"joinaggregate": [{"op": "sum", "field": "intersection_size", "as": "source_count"}], "groupby": ["source"]},
    {"joinaggregate": [{"op": "sum", "field": "intersection_size", "as": "target_count"}], "groupby": ["target"]},
    {"window": [{"op": "dense_rank", "as": "set_rank"}], "sort": [{"field": "source_count", "order": "descending"}]},
    {"filter": "datum.set_rank <= 10"},
    {"filter": {"selection": "item_select"}},
    {"joinaggregate": [{"op": "sum", "field": "intersection_size", "as": "target_count_selection"}], "groupby": ["target"]},
    {"joinaggregate": [{"op": "mean", "field": "intersection_size", "as": "group_key_count"}], "groupby": ["group_key"]},
    {"window": [{"op": "dense_rank", "as": "rank"}], "sort": [{"field": "group_key_count", "order": "descending"}]},
    {"filter": "datum.rank <= 15"},
    {"joinaggregate": [{"op": "sum", "field": "intersection_size", "as": "source_count_selection"}], "groupby": ["source"]}
  ],
  "hconcat": [
    {
      "vconcat": [
        {
          "layer": [
            {
              "selection": {
                "item_select": {"type": "single", "fields": ["source"]},
                "item_select2": {"type": "single", "fields": ["source"], "empty": "none"}
              },
              "height": 200,
              "width": 200,
              "mark": "arc",
              "encoding": {
                "theta": {"aggregate": "mean", "field": "source_count"},
                "order": {"field": "source_count", "type": "quantitative", "sort": "descending"},
                "color": {"field": "source", "type": "nominal", "legend": null, "scale": {"scheme": "tableau20"}},
                "tooltip": [
                  {"field": "source", "type": "nominal", "title": "Item"},
                  {"field": "source_count", "type": "nominal", "title": "Total Set Size"}
                ]
              }
            },
            {
              "transform": [
                {"filter": {"selection": "item_select2"}},
                {"sample": 1}
              ],
              "mark": {"type": "text", "color": "white"},
              "encoding": {
                "text": {"field": "source", "type": "nominal"}
              }
            }
          ]
        },
        {
          "transform": [
            {"fold": ["source", "target"]}
          ],
          "layer": [
            {
              "transform": [
                {"filter": "datum.key == 'target'"},
                {"filter": {"selection": "item_select"}}
              ],
              "mark": {"type": "bar", "color": "#dddddd"},
              "encoding": {
                "x": {"field": "target_count", "type": "quantitative", "scale": {"reverse": true}, "axis": {"orient": "top"}, "title": null},
                "tooltip": [
                  {"field": "value", "type": "nominal", "title": "Author ID"},
                  {"aggregate": "mean", "field": "target_count", "type": "nominal", "title": "Total Set Size"}
                ]
              }
            },
            {
              "transform": [
                {"filter": "datum.key == 'target'"},
                {"filter": {"selection": "item_select"}}
              ],
              "mark": {"type": "bar", "color": "#999999"},
              "encoding": {
                "x": {"field": "target_count_selection", "type": "quantitative", "scale": {"reverse": true}, "axis": {"orient": "top"}, "title": null},
                "tooltip": [
                  {"field": "value", "type": "nominal", "title": "Author ID"},
                  {"aggregate": "mean", "field": "target_count_selection", "type": "nominal", "title": "Size Displayed"}
                ]
              }
            },
            {
              "transform":[
                {"filter": "datum.key == 'source'"}
              ],
              "mark": {"type": "bar", "color": "#dddddd"},
              "encoding": {
                "x": {"field": "source_count", "type": "quantitative", "scale": {"reverse": true}, "axis": {"orient": "top"}, "title": null},
                "tooltip": [
                  {"field": "value", "type": "nominal", "title": "Author ID"},
                  {"aggregate": "mean", "field": "source_count", "type": "nominal", "title": "Total Set Size"}
                ]
              }
            },
            {
              "transform":[
                {"filter": "datum.key == 'source'"},
                {"filter": {"selection": "item_select"}}
              ],
              "mark": {"type": "bar", "color": "#4c78a8"},
              "encoding": {
                "x": {"field": "source_count_selection", "type": "quantitative", "scale": {"reverse": true}, "axis": {"orient": "top"}, "title": null},
                "color": {"field": "source", "type": "nominal"},
                "tooltip": [
                  {"field": "value", "type": "nominal", "title": "Author ID"},
                  {"aggregate": "mean", "field": "source_count_selection", "type": "nominal", "title": "Size Displayed"}
                ]
              }
            }
          ],
          "encoding": {
            "y": {"field": "value", "type": "nominal", "axis": null}
          }
        }
      ]
    },
    {
      "vconcat": [
        {
          "height": 200,
          "width": 300,
          "mark": {"type": "bar", "color": "#777777"},
          "encoding": {
            "x": {"field": "group_key", "type": "nominal", "sort": {"field": "group_key_count", "order": "descending"}, "axis": null},
            "y": {"field": "group_key_count", "type": "quantitative", "title": null},
            "order": {"aggregate": "mean", "field": "group_key_count"},
            "tooltip": [
              {"field": "group_key", "type": "nominal", "title": "Intersection"},
              {"aggregate": "mean", "field": "group_key_count", "type": "quantitative", "title": "Size"}
            ]
          }
        },
        {
          "width": 300,
          "layer": [
            {
              
              "transform": [
                {"fold": ["source", "target"]},
                {"window": [{"op": "rank", "as": "r1"}], "groupby": ["value"]},
                {"filter": "datum.r1 == 1"},
                {"window": [{"op": "dense_rank", "as": "AlphaRank"}], "sort": [{"field": "value", "order": "ascending"}]},
                {"calculate": "datum.AlphaRank % 2", "as": "even_odd"}
              ],
              "mark": "rect",
              "encoding": {
                "y": {"field": "value", "type": "nominal"},
                "color": {"field": "even_odd", "type": "nominal", "scale": {"range": ["#ffffff","#eeeeee"]}, "legend": null}
              }
            },
            {
              "layer": [
                {
                  "mark": {"type": "rule", "color": "#555555", "opacity": 1, "strokeWidth": 2},
                  "encoding": {
                    "y": {"field": "source", "type": "nominal", "title": null, "axis": {"labelAlign": "left", "labelPadding": 100, "labelLimit": 100, "ticks": false}},
                    "y2": {"field": "target"},
                    "tooltip": [
                      {"field": "group_key", "type": "nominal", "title": "Intersection"},
                      {"aggregate": "mean", "field": "group_key_count", "type": "quantitative", "title": "Size"}
                    ]
                  }
                },
                {
                  "mark": {"type": "point", "filled": true, "size": 75, "color": "#555555", "opacity": 1},
                  "encoding": {
                    "y": {"field": "source", "type": "nominal"},
                    "tooltip": [
                      {"field": "group_key", "type": "nominal", "title": "Intersection"},
                      {"aggregate": "mean", "field": "group_key_count", "type": "quantitative", "title": "Size"}
                    ]
                  }
                },
                {
                  "mark": {"type": "point", "filled": true, "size": 75, "color": "#555555", "opacity": 1},
                  "encoding": {
                    "y": {"field": "target", "type": "nominal"},
                    "tooltip": [
                      {"field": "group_key", "type": "nominal", "title": "Intersection"},
                      {"aggregate": "mean", "field": "group_key_count", "type": "quantitative", "title": "Size"}
                    ]
                  }
                }
              ],
              "encoding": {
                "x": {"field": "group_key", "type": "nominal", "sort": {"field": "group_key_count", "order": "descending"}, "axis": null}
              }
            }
          ]
        }
      ]
    }
  ], "config": {"concat": {"spacing": 0}}, "resolve": {"scale": {"color": "independent"}}
});

export default function InteractiveUpsetPlot(props) {
  const {data} = props;
  const realSpec = {
    ... VLspec,
    'title': props.title,
  };
  return <VegaLite data={data} spec = {realSpec}/>
}

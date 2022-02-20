import { useState, useEffect, useCallback } from 'react';
import Graphin, { Behaviors, GraphinData } from '@antv/graphin';
import { request } from 'umi';

const { ZoomCanvas } = Behaviors;

export default () => {
  const [data, setData] = useState<GraphinData>({ nodes: [], edges: [] });

  const fetchData = useCallback(async () => {
    const res = await request('/api/dashboard/antv');
    const result: GraphinData = { nodes: [], edges: [] };

    res.records.forEach((record) => {
      result.nodes.push({
        id: record._fields[0].properties.client_id,
        x: record._fields[0].identity.low,
        y: record._fields[0].identity.high,
        style: {
          label: {
            value: record._fields[0].properties.client_id,
          },
        },
      });

      result.nodes.push({
        id: record._fields[2].properties.provider_id,
        x: record._fields[2].identity.low,
        y: record._fields[2].identity.high,
        style: {
          label: {
            value: record._fields[2].properties.provider_id,
          },
        },
      });

      result.edges.push({
        source: record._fields[0].properties.client_id,
        target: record._fields[2].properties.provider_id,
        style: {
          keyshape: {
            stroke: '#FF6A00',
          },
          label: {
            value: record._fields[1].type,
            fill: '#FF6A00',
          },
        },
      });
    });

    setData((ret) => ({
      ...ret,
      ...result,
    }));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Graphin data={data}>
      <ZoomCanvas />
    </Graphin>
  );
};

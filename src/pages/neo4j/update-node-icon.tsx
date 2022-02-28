import React, { useCallback, useContext, useEffect } from 'react';
import { GraphinContext, GraphinData, IG6GraphEvent } from '@antv/graphin';
import Graphin from '@antv/graphin';

// 引入资源文件
import iconLoader from '@antv/graphin-icons';
import '@antv/graphin-icons/dist/index.css';
import { IGraph } from '@antv/g6';

// 注册到 Graphin 中
const { fontFamily } = iconLoader();
const icons = Graphin.registerFontFamily(iconLoader);

export const useNodeClick = (graph: IGraph) => {
  return useCallback((evt: IG6GraphEvent) => {
    const { item: node } = evt;
    const model = node?.getModel();

    graph.updateItem(model?.id as string, {
      style: {
        icon: {
          type: 'font', // 指定图标为Font类型
          fontFamily: fontFamily, // 指定FontFamily
          value: icons.home, // 指定图标的值
        },
      },
    });
  }, []);
};

export const useDoubleClick = (
  graph: IGraph,
  insertNode: React.Dispatch<React.SetStateAction<GraphinData>>,
) => {
  return useCallback(async (evt: IG6GraphEvent) => {
    const { item: node } = evt;
    const model = node?.getModel();
    const newId = new Date().getTime() + '';

    insertNode((source) => ({
      nodes: [
        ...source.nodes,
        { id: newId, style: { label: { value: newId } } },
      ],
      edges: [
        ...source.edges,
        {
          source: model?.id as string,
          target: newId,
        },
      ],
    }));
  }, []);
};

export const UpdateNodeIcon: React.FC<{
  insertNode: React.Dispatch<React.SetStateAction<GraphinData>>;
}> = ({ insertNode }) => {
  const { graph } = useContext(GraphinContext);
  const handleNodeClick = useNodeClick(graph);
  const handleNodeDbClick = useDoubleClick(graph, insertNode);

  useEffect(() => {
    graph.on('node:click', handleNodeClick);
    graph.on('node:dblclick', handleNodeDbClick);

    return () => {
      graph.off('node:click', handleNodeClick);
      graph.off('node:dblclick', handleNodeDbClick);
    };
  }, []);

  return null;
};

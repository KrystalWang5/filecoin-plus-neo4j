import { useEffect } from 'react';
import NeoVis from 'neovis.js';

export default () => {
  useEffect(() => {
    const config = {
      container_id: 'viz',
      server_url: 'bolt://localhost:7687',
      server_user: 'neo4j',
      server_password: '000000',
      labels: {
        //"Character": "name",
        Character: {
          caption: 'name',
          size: 'pagerank',
          community: 'community',
          //"image": 'https://visjs.org/images/visjs_logo.png',
          title_properties: ['name', 'pagerank'],
          //"sizeCypher": "MATCH (n) WHERE id(n) = {id} MATCH (n)-[r]-() RETURN sum(r.weight) AS c"
        },
      },
      relationships: {
        INTERACTS: {
          thickness: 'weight',
          caption: false,
        },
      },
      initial_cypher: `
      MATCH (c:Client)-[s:spending]->(p:Provider)
      WHERE c.client_name = 'Speedium'
      RETURN c, s, p`,
    };

    const viz = new NeoVis(config);
    viz.render();
  }, []);

  return <div id={'viz'} style={{ height: `calc(100vh - 48px)` }} />;
};

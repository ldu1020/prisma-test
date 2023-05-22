import { useEffect, useState } from 'react';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';

import axios from 'axios';

import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<{
  spec: any;
}>(import('swagger-ui-react') as any, { ssr: false });

export default function ApiDoc() {
  const [spec, setSpec] = useState<null | Record<string, any>>(null);
  useEffect(() => {
    const init = async () => {
      const spec = await axios.get('/api/doc').then((res) => res.data);
      console.log({ spec });
      setSpec(spec);
    };
    init();
  }, []);
  if (!spec) return null;
  return <SwaggerUI spec={spec} />;
}

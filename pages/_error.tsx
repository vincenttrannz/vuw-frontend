import React from 'react';
import Custom404 from './Custom404';
import Custom505 from './Custom500';

function Error({statusCode}:any) {
  // console.log("Error status:", statusCode);
  return (
    <>
      {
        statusCode
        ? <Custom505/>
        : <Custom404/>
      }
    </>
  )
}

Error.getInitialProps = ({ res, err }:any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error;
"use client";

import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

const HeadroomWrapper: React.FC<Props> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let headroom: any;

    // Dynamic import to avoid SSR issues
    import("headroom.js").then((module) => {
      if (ref.current) {
        headroom = new module.default(ref.current);
        headroom.init();
      }
    });

    return () => {
      if (headroom) headroom.destroy();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
};

export default HeadroomWrapper;

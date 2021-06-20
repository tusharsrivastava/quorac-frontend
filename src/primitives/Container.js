import { useMemo, useState, useEffect } from "react";

export const Container = (props) => {
  const { className, children, ...rest } = props;
  const [lcn, setlcn] = useState("");

  useEffect(() => {
    if (className) {
      setlcn(className);
    }
  }, [className]);

  return (
    <div className={`container-xl ${lcn}`} {...rest}>
      {children}
    </div>
  );
}

export const Row = (props) => {
  const { className, children, ...rest } = props;
  const [lcn, setlcn] = useState("");

  useEffect(() => {
    if (className) {
      setlcn(className);
    }
  }, [className]);

  return (
    <div className={`row ${lcn}`} {...rest}>
      {children}
    </div>
  );
}

export const Col = (props) => {
  const { size, sm, md, lg, xl, xxl, className, children, ...rest } = props;

  const [lcn, setlcn] = useState("");

  useEffect(() => {
    if (className) {
      setlcn(className);
    }
  }, [className]);

  const colClass = useMemo(() => {
    let c = [];
    if (size) {
      c.push(`col-${size}`);
    }
    if (sm) {
      c.push(`col-sm-${sm}`);
    }
    if (md) {
      c.push(`col-md-${md}`);
    }
    if (lg) {
      c.push(`col-lg-${lg}`);
    }
    if (xl) {
      c.push(`col-xl-${xl}`);
    }
    if (xxl) {
      c.push(`col-xxl-${xxl}`);
    }
    return c.join(" ");
  }, [size, sm, md, lg, xl, xxl]);

  return <div className={`${colClass} ${lcn}`} {...rest}>{children}</div>;
};

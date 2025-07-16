"use client";

import * as React from "react";

const CollapsibleContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: true,
  setOpen: () => {},
});

function Collapsible({
  defaultOpen = false,
  children,
  className,
}: React.ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div className={className}>{children}</div>
    </CollapsibleContext.Provider>
  );
}

function CollapsibleTrigger({
  children,
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { setOpen } = React.useContext(CollapsibleContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen((prevOpen) => !prevOpen);
    if (onClick) onClick(e);
  };

  return (
    <button onClick={handleClick} className={className} {...props}>
      {children}
    </button>
  );
}

function CollapsibleContent({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { open } = React.useContext(CollapsibleContext);

  if (!open) return null;

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

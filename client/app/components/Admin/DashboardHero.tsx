import React, { FC, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardWigets from "./Widgets/DashboardWidgets";
type Props = {
  isDashboard?: boolean;
};

const DashboardHero: FC<Props> = ({ isDashboard }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />
      {isDashboard && <DashboardWigets open={open} />}
    </div>
  );
};

export default DashboardHero;

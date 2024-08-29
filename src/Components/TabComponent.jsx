

import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TableComponent from "./DashTable"; 
import formatDateTime from "../utils/formatDateTime";




function TabComponent({scheduled,sented}) {
  const formattedSchedule = scheduled.map(item => ({
    ...item,
    ...formatDateTime(item.scheduled_time),
  }))

  const formattedSent = sented.map((item) => ({
    ...item,
    ...formatDateTime(item.scheduled_time),
  }));

  return (
    <div className="flex w-full items-center flex-col ">
      <Tabs aria-label="Email Options" radius="md" color="success">
        <Tab
          className="font-medium "
          key="sent"
          title={
            <div className="flex gap-1 items-center">
              <i class="fa-solid fa-clock"></i>
              <p>Scheduled emails</p>
            </div>
          }
        >
          <TableComponent data={formattedSchedule} type={'scheduled'} />
        </Tab>
        <Tab
          className="font-medium "
          key="scheduled"
          title={
            <div className="flex gap-1 items-center">
              <i class="fa-solid fa-paper-plane"></i>
              <p>sented emails</p>
            </div>
          }
        >
          <TableComponent data={formattedSent} type={'scheduled'} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default TabComponent;

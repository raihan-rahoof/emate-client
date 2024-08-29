import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Calendar,
  TimeInput,
} from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { format, parse } from "date-fns";
import { toast } from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import Swal from "sweetalert2";
import axios from "axios";

function DashTable({ data, type }) {
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onOpenChange: onViewOpenChange,
  } = useDisclosure();

  const {
    isOpen: isScheduleOpen,
    onOpen: onScheduleOpen,
    onOpenChange: onScheduleOpenChange,
  } = useDisclosure();
  const [selectedMail, setSelectedMail] = useState(null);

  const [formData, setFormData] = useState({
    recipients: "",
    name: "",
    subject: "",
    content: "",
    scheduled_time: "",
  });

  const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));
  const [selectedTime, setSelectedTime] = useState();

  console.log(selectedTime, selectedDate);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const formatDateTime = () => {
    if (!selectedTime || typeof selectedTime !== "object") {
      console.error("selectedTime is not a valid time object:", selectedTime);
      return null;
    }

    const formattedHour = selectedTime.hour;
    const minutes = selectedTime.minute;

    console.log(formattedHour, minutes);

    const formattedDate = format(
      new Date(
        selectedDate.year,
        selectedDate.month - 1,
        selectedDate.day,
        formattedHour,
        minutes
      ),
      "yyyy-MM-dd'T'HH:mm:ssXXX"
    );

    return formattedDate;
  };

  const handleViewMail = (mail) => {
    setSelectedMail(mail);
    onViewOpen();
  };

  const handleScheduleMail = () => {
    onScheduleOpen();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault;

    if (
      !formData.recipients ||
      !formData.name ||
      !formData.subject ||
      !formData.content ||
      !selectedTime
    ) {
      toast.error("Please Enter all Details");
      return;
    }

    const formattedDateTime = formatDateTime();

    const dataToSend = {
      ...formData,
      scheduled_time: formattedDateTime,
    };

    try {
      const response = await axiosInstance.post(
        "schedulers/handle-mail/",
        dataToSend
      );
      console.log(response);
      if (response.status === 201) {
        toast.success("Email Scheduled successfully");
        onScheduleOpenChange(false);
      } else {
        toast.error("Some error occurred. Try again by checking your side");
        onScheduleOpenChange(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error occurred. Try again by checking your side");
      onScheduleOpenChange(false);
    }
  };

  const HandleDelete = async(e,id)=>{
    e.preventDefault;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const res = axiosInstance.delete(`schedulers/handle-mail/${id}/`);
        if (res.status === 204 ){
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
        
      }
    });
  }

  return (
    <>
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-10 mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="bg-[#18181b] rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800">
                <div className="px-4 py-4 sm:px-6 sm:flex sm:flex-wrap sm:justify-between sm:items-center">
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="hs-as-table-product-review-search"
                      className="sr-only"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="hs-as-table-product-review-search"
                        name="hs-as-table-product-review-search"
                        className="py-2 px-3 ps-11 block w-full bg-[#0f0f10] text-white rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Search"
                      />
                      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                        <svg
                          className="shrink-0 size-4 text-gray-400 dark:text-neutral-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.3-4.3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      onPress={handleScheduleMail}
                      className="w-full sm:w-auto py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-500 text-white hover:bg-green-700 focus:outline-none  disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <svg
                        className="shrink-0 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                      Schedule Mail
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] dark:divide-neutral-700">
                    <thead className="bg-[#0f0f10] ">
                      <tr>
                        {[
                          "To Email",
                          "Name",
                          "Time",
                          "Date",
                          "Status",
                          "View",
                          "",
                        ].map((header, index) => (
                          <th
                            key={index}
                            scope="col"
                            className="px-3 py-3 text-start"
                          >
                            <span className="text-xs font-semibold uppercase tracking-wide text-white dark:text-neutral-200">
                              {header}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className=" dark:divide-neutral-700">
                      {data.length > 0 ? (
                        data.map((item,index) => (
                          <tr
                            className="dark:hover:bg-neutral-700"
                            key={item.id}
                          >
                            <td className="px-3 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-x-3">
                                <div className="grow">
                                  <span className="block text-sm font-semibold text-white dark:text-neutral-200">
                                    {item.recipients}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">
                              <span className="block text-sm font-semibold text-white dark:text-neutral-200">
                                {item.name}
                              </span>
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">
                              <span className="block text-sm font-semibold text-white dark:text-neutral-200">
                                {item.time}
                              </span>
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">
                              <span className="block text-sm font-semibold text-white dark:text-neutral-200">
                                {item.date}
                              </span>
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">
                              {item.is_sent ? (
                                <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                  Sented <i className="fa-solid fa-check"></i>
                                </span>
                              ) : (
                                <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium  rounded-full dark:bg-yellow-800 dark:text-white ">
                                  Scheduled{" "}
                                  <i className="fa-solid fa-bookmark"></i>
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">
                              <span
                                className="block text-sm font-semibold text-white dark:text-neutral-200 cursor-pointer"
                                onClick={() => handleViewMail(item)}
                              >
                                <i className="fa-solid fa-eye"></i>
                              </span>
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap text-end">
                              <Button onClick={(e)=> HandleDelete(e,item.id)} className="hover:bg-red-600 " size="sm">
                                <i className="fa-solid fa-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-3 py-3 text-center">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>

      {/* Viewing Mail Modal */}
      <Modal
        className="bg-[#0f0f10]"
        isOpen={isViewOpen}
        onOpenChange={onViewOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">
                Email Details
              </ModalHeader>
              <ModalBody>
                {selectedMail ? (
                  <>
                    <Input
                      className="text-white"
                      color="success"
                      label="To Mail"
                      placeholder="Receiver Mail"
                      variant="bordered"
                      value={selectedMail.recipients}
                      disabled
                    />
                    <Input
                      className="text-white"
                      color="success"
                      label="Reciver's name"
                      placeholder="Subject"
                      variant="bordered"
                      value={selectedMail.name}
                      disabled
                    />
                    <Input
                      className="text-white"
                      color="success"
                      label="Subject"
                      placeholder="Subject"
                      variant="bordered"
                      value={selectedMail.subject}
                      disabled
                    />
                    <Textarea
                      label="Body of Mail"
                      color="success"
                      variant="bordered"
                      value={selectedMail.content}
                      disabled
                      classNames={{
                        input: "resize-y min-h-[40px] text-white",
                      }}
                    />
                    <Input
                      className="text-white"
                      color="success"
                      label="Sented time"
                      placeholder="Subject"
                      variant="bordered"
                      value={selectedMail.time}
                      disabled
                    />
                    <Input
                      className="text-white"
                      color="success"
                      label="Sented Date"
                      placeholder="Subject"
                      variant="bordered"
                      value={selectedMail.date}
                      disabled
                    />
                  </>
                ) : (
                  <p className="text-white">No email selected.</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Scheduling Mail Modal */}
      <Modal
        className="bg-[#0f0f10]"
        isOpen={isScheduleOpen}
        onOpenChange={onScheduleOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">
                Schedule Email
              </ModalHeader>
              <ModalBody>
                <Input
                  className="text-white"
                  color="success"
                  label="To Mail"
                  placeholder="Receiver Mail"
                  variant="bordered"
                  name="recipients"
                  value={formData.recipients}
                  onChange={handleInputChange}
                />
                <Input
                  className="text-white"
                  color="success"
                  label="Reciver's name"
                  placeholder="Subject"
                  variant="bordered"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <Input
                  className="text-white"
                  color="success"
                  label="Subject"
                  placeholder="Subject"
                  variant="bordered"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                />

                <Textarea
                  className="text-white"
                  color="success"
                  label="Content"
                  placeholder="Enter your message"
                  variant="bordered"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                />

                <div className="flex justify-center items-center">
                  <Calendar
                    color="success"
                    aria-label="Date (Min Date Value)"
                    defaultValue={selectedDate}
                    onChange={handleDateChange}
                    minValue={today(getLocalTimeZone())}
                  />
                </div>
                <TimeInput
                  label="Time to Send"
                  color="success"
                  variant="bordered"
                  onChange={handleTimeChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={handleFormSubmit}>
                  Schedule
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default DashTable;

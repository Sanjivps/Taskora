import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const data = [
    {
      _id: "65c5bbf3787832cf99f28e6d",
      team: [
        "65c202d4aa62f32ffd1303cc",
        "65c27a0e18c0a1b750ad5cad",
        "65c30b96e639681a13def0b5",
      ],
      text: "New task has been assigned to you and 2 others. The task priority is set a normal priority, so check and act accordingly. The task date is Thu Feb 29 2024. Thank you!!!",
      task: null,
      notiType: "alert",
      isRead: [],
      createdAt: "2024-02-09T05:45:23.353Z",
      updatedAt: "2024-02-09T05:45:23.353Z",
      __v: 0,
    },
    {
      _id: "65c5f12ab5204a81bde866ab",
      team: [
        "65c202d4aa62f32ffd1303cc",
        "65c30b96e639681a13def0b5",
        "65c317360fd860f958baa08e",
      ],
      text: "New task has been assigned to you and 2 others. The task priority is set a high priority, so check and act accordingly. The task date is Fri Feb 09 2024. Thank you!!!",
      task: {
        _id: "65c5f12ab5204a81bde866a9",
        title: "Test task",
      },
      notiType: "alert",
      isRead: [],
      createdAt: "2024-02-09T09:32:26.810Z",
      updatedAt: "2024-02-09T09:32:26.810Z",
      __v: 0,
    },
];

const ICONS = {
    alert: (
      <HiBellAlert className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
    ),
    message: (
      <BiSolidMessageRounded className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
    ),
};

const NotificationPanel = () => {
    return (
        <Popover className="relative">
            <Popover.Button className="relative rounded-full p-2 hover:bg-gray-100">
                <IoIosNotificationsOutline className="h-6 w-6 text-gray-600" />
                {data.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                        {data.length}
                    </span>
                )}
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute right-0 z-10 mt-2 w-80 transform">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative bg-white p-4">
                            <div className="flex items-center justify-between border-b pb-2">
                                <h3 className="text-lg font-semibold">Notifications</h3>
                                {data.length > 0 && (
                                    <button className="text-sm text-indigo-600 hover:text-indigo-800">
                                        Mark all as read
                                    </button>
                                )}
                            </div>

                            <div className="mt-2 max-h-96 space-y-2 overflow-y-auto">
                                {data.length === 0 ? (
                                    <p className="text-center text-gray-500">No notifications</p>
                                ) : (
                                    data.map((notification) => (
                                        <div
                                            key={notification._id}
                                            className="group flex gap-3 rounded-lg p-2 hover:bg-gray-50"
                                        >
                                            <div className="mt-1">
                                                {ICONS[notification.notiType]}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-600">
                                                    {notification.text}
                                                </p>
                                                {notification.task && (
                                                    <Link
                                                        to={`/task/${notification.task._id}`}
                                                        className="mt-1 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                                    >
                                                        View Task: {notification.task.title}
                                                    </Link>
                                                )}
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {moment(notification.createdAt).fromNow()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};

export default NotificationPanel;
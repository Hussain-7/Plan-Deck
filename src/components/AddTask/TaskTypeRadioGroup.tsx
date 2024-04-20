"use client";
import { memo, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useBoardStore } from "@/store/BoardStore";
import { CheckCircleIcon } from "@heroicons/react/16/solid";

type Props = {};

const types = [
  {
    id: "todo",
    name: "Todo",
    description: "A new task to be completed",
    color: "bg-red-500",
  },
  {
    id: "inprogress",
    name: "In Progress",
    description: "A task that is currently being worked on",
    color: "bg-yellow-500",
  },
  {
    id: "done",
    name: "Done",
    description: "A task that has been completed",
    color: "bg-green-500",
  },
];

const TaskTypeRadioGroup = (props: Props) => {
  const [taskInputType, setTaskInput] = useBoardStore((state) => [
    state.newTaskInput.type,
    state.setTaskInput,
  ]);
  console.log("Rendered TaskTypeRadioGroup");
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          value={taskInputType}
          onChange={(value) => setTaskInput({ type: value as TypedColumn })}
        >
          <div className="space-y-2">
            {types.map((type) => (
              <RadioGroup.Option
                key={type.id}
                value={type.id}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked
                      ? `${type.color} bg-opacity-75 text-white`
                      : "bg-white"
                  }
                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none
                  `
                }
              >
                {({ active, checked }) => (
                  <>
                    {" "}
                    <div
                      className={`flex w-full items-center justify-between `}
                    >
                      <div className={`flex items-center`}>
                        <div className="flex flex-col text-sm gap-1">
                          <RadioGroup.Label
                            as-="p"
                            className={`font-medium ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {type.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-white" : "text-gray-500"
                            }`}
                          >
                            <span>{type.description}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckCircleIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default memo(TaskTypeRadioGroup);
